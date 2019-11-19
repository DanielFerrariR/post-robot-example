import React, { useEffect } from "react";
import postRobot from "post-robot";

const App = () => {
  useEffect(() => {
    postRobot.on(
      "bar",
      { window: window.opener, domain: "http://localhost:5000" },
      event => {
        var el = document.getElementById("parent-message");
        el.innerHTML += "\n" + event.data.message;
        return {
          message: event.data.message
        };
      }
    );
  }, []);

  const sendMessage = async () => {
    try {
      const event = await postRobot.send(
        window.opener,
        "foo",
        {
          message: Math.random().toString()
        },
        { domain: "http://localhost:5000" }
      );
      const el = document.getElementById("child-message");
      el.innerHTML += "\n" + event.data.message;
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
