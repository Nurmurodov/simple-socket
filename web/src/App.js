import React, {useEffect, useRef, useState} from "react";
import io from 'socket.io-client'
import {TextField} from "@material-ui/core";
import './App.css';


function App() {
  const [stateIo, setStateIo] = useState({message: '', name: ''});
  const [chat, setChat] = useState([]);

  const socketRef = useRef()

  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:4000")
      socketRef.current.on("message", ({ name, message }) => {
        setChat([ ...chat, { name, message } ])
      })
      return () => socketRef.current.disconnect()
    },
    [ chat ]
  )


  const onTextChange = (e) => {
    setStateIo({ ...stateIo, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = stateIo
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setStateIo({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>
          Messanger
        </h1>
        <div className="name-field">
          <TextField
            name={'name'}
            label={"Name"}
            value={stateIo.name}
            onChange={onTextChange}/>
        </div>
        <div>
          <TextField
            name={'message'}
            label={"Message"}
            value={stateIo.message}
            variant={"outlined"}
            onChange={onTextChange}/>
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
