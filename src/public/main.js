

const notesForm = document.querySelector("#notesForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

notesForm.addEventListener("submit", e => {
  e.preventDefault();

  if (title.value === "" || description.value === "") return;

  if (savedId) {
    updateNote(savedId, title.value, description.value)
  } else {
    saveNote(title.value, description.value)
  }

  title.value = "";
  description.value= "";

  title.focus()

})
