import React, { useEffect } from "react";
import postRobot from "post-robot";

const App = () => {
  useEffect(() => {
    postRobot.on(
      "bar",
      { window: window.opener, domain: "http://localhost:5000" },
      event => {
        console.log("Received from the parent", event.data.message);
        var el = document.getElementById("parent-message");
        el.innerHTML += "\n" + event.data.message.name;
        return {
          message: event.data.message
        };
      }
    );
  }, []);

  const sendMessage = async () => {
    const user = { id: 2, name: "pedro", age: 32 };
    try {
      const event = await postRobot.send(
        window.opener,
        "foo",
        {
          message: user
        },
        { domain: "http://localhost:5000" }
      );
      console.log("Returned from the parent", event.data.message);
      const el = document.getElementById("child-message");
      el.innerHTML += "\n" + event.data.message.name;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>post</button>
      <div id="parent-message">Parent Message:</div>
      <div id="child-message">Child Message:</div>
    </div>
  );
};

export default App;
