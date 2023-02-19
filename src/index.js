import express from "express";
import http from "http";
import { Server as WebSocketServer} from "socket.io";

import { v4 as uuidv4 } from 'uuid';



const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);



// almacena las notas
let notes = [];


app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
  console.log('Nueva conección', socket.id)

  socket.emit("server:loadnotes", notes)

  socket.on("client:newnote", data => {
    const note = {
      id: uuidv4(),
      title: data.title,
      description: data.description
    }

    // console.log(note)
    notes.push(note);
    io.emit("server:newnote", note )
  })

  socket.on("client:deletenote", id => {
    notes = notes.filter(note => note.id !== id)
    io.emit("server:loadnotes", notes)
  } )

  socket.on("client:getnote", id => {
    const note = notes.find(note => note.id === id);
    socket.emit("server:selectednote", note)
  })

  socket.on("client:updatenote", noteSave => {
    notes = notes.map( note => {
      if (note.id === noteSave.id) {
        note.title = noteSave.title,
        note.description = noteSave.description
      }
      return note
    })
    io.emit("server:loadnotes", notes)
  })


})



const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})