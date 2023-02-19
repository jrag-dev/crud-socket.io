const socket = io();


/**
 * 
 * @param {string} title note title
 * @param {description} description note description
 */
const saveNote = (title, description) => {

  socket.emit("client:newnote", {
    title,
    description
  })

}


const deleteNote = id => {
  socket.emit("client:deletenote", id)
}

const updateNote = (id, title, description) => {
  socket.emit("client:updatenote", {
    id,
    title,
    description
  })
}

const getNote = id => {
  socket.emit("client:getnote", id)
}



socket.on("server:newnote", data => appendNote(data))

socket.on("server:loadnotes", notes => renderNotes(notes))

socket.on("server:selectednote", note => {
  console.log(note)
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  title.value = note.title,
  description.value = note.description;

  savedId = note.id
})