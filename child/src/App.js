import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import postRobot from "post-robot";

function App() {
  function sendMessage() {
    postRobot
      .send(window.opener, "foo", { message: Math.random().toString() })
      .then(function(event) {
        var el = document.getElementById("messages");
        el.innerHTML += "\n" + event.data.message;
      });
  }

  return (
    <div>
      <button onClick={() => sendMessage()}>post</button>
      <div id="messages"></div>
    </div>
  );
}

export default App;
