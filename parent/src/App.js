import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import postRobot from "post-robot";

function App() {
  useEffect(() => {
    postRobot.on("foo", function(event) {
      var el = document.getElementById("messages");
      el.innerHTML += "\n" + event.data.message;
      return {
        message: event.data.message
      };
    });
  }, []);

  function openWindow() {
    window.open(
      "http://localhost:3000/",
      Math.random()
        .toString()
        .replace(/[^a-z0-9]+/g, "")
    );
  }

  return (
    <div>
      <button onClick={() => openWindow()}>open</button>
      <div id="messages"></div>
    </div>
  );
}

export default App;
