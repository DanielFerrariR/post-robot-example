import React, { useState } from "react";
import postRobot from "post-robot";

const App = () => {
  const [childWindow, setChildWindow] = useState("");

  const openWindow = () => {
    const newWindow = window.open("http://localhost:3000");

    postRobot.on(
      "foo",
      { window: newWindow, domain: "http://localhost:3000" },
      event => {
        var el = document.getElementById("child-message");
        el.innerHTML += "\n" + event.data.message;
        return {
          message: event.data.message
        };
      }
    );

    setChildWindow(newWindow);
  };

  const sendMessage = async () => {
    try {
      const event = await postRobot.send(
        childWindow,
        "bar",
        {
          message: Math.random().toString()
        },
        { domain: "http://localhost:3000" }
      );
      const el = document.getElementById("parent-message");
      el.innerHTML += "\n" + event.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={openWindow}>open</button>
      <button onClick={sendMessage}>post</button>
      <div id="parent-message">Parent Message:</div>
      <div id="child-message">Child Message:</div>
    </div>
  );
};

export default App;
