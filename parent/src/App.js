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
        console.log("Recebeu do filho: ", event.data.message);
        var el = document.getElementById("child-message");
        el.innerHTML += "\n" + event.data.message.name;
        return {
          message: event.data.message
        };
      }
    );

    setChildWindow(newWindow);
  };

  const sendMessage = async () => {
    const user = { id: 1, name: "daniel", age: 26 };
    try {
      const event = await postRobot.send(
        childWindow,
        "bar",
        {
          message: user
        },
        { domain: "http://localhost:3000" }
      );
      console.log("Retorno do envio:", event.data.message);
      const el = document.getElementById("parent-message");
      el.innerHTML += "\n" + event.data.message.name;
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
