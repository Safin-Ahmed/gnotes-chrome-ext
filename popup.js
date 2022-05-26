document.getElementById("name").addEventListener("keyup", () => {
  document.getElementById("greet").innerText =
    "Hello World " + document.getElementById("name").value;
});
