const notesList = document.querySelector("#notes");


let savedId = "";

const noteIU = note => {

  const div = document.createElement("div");

  div.innerHTML = `
    <div class="card card-body rounded-0 mb-3 animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between">
        <h3 class="card-title">${note.title}</h3>
        <div>
          <button class="btn btn-primary update" data-id="${note.id}">Update</button>
          <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
        </div>
      </div>
      <p>${note.description}</p>
    </div>
  `;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update")

  btnDelete.addEventListener("click", () => {
    deleteNote(btnDelete.dataset.id)
  })

  btnUpdate.addEventListener("click", () => {
    getNote(btnUpdate.dataset.id)
  })

  return div;

}


const renderNotes = (notes) => {
  savedId = "";
  notesList.innerHTML = '';
  notes.forEach((note) => {
    notesList.append(noteIU(note))
  })
}

const appendNote = note => {
  notesList.append(noteIU(note))
}