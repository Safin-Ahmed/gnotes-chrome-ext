const menuItem = {
  id: "notedown",
  title: "Note Down",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem);

function convertStr(str) {
  return str.toString();
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId === "notedown" && clickData.selectionText) {
    const noteText = convertStr(clickData.selectionText);
    chrome.storage.sync.get("note", (note) => {
      const prevNote = note.note;
      const finalNote = `${prevNote} ${noteText}`;
      chrome.storage.sync.set({ note: finalNote }, () => {
        if (noteText && finalNote) {
          let notifOptions = {
            type: "basic",
            iconUrl: "icon32.png",
            title: "New note added!",
            message: "Your new note has been copied to GNotes",
          };
          chrome.notifications.create("addNotif", notifOptions);
        }
      });
    });
  }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
  console.log(changes);
  chrome.browserAction.setBadgeText({
    text: changes.note.newValue.slice(0, -1).toString(),
  });
});
