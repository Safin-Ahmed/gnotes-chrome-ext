const inputArea = document.getElementById("notearea");
const events = ["change", "paste"];

chrome.storage.sync.get("note", (note) => {
  inputArea.value = note.note;
});

events.forEach((ev) =>
  inputArea.addEventListener(ev, () => {
    let noteText = inputArea.value;
    chrome.storage.sync.set({ note: noteText });
  })
);
