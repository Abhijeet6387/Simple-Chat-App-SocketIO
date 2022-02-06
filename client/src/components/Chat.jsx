import React, { useEffect, useState } from "react";
// react library from scroll
import ScrollToBottom from "react-scroll-to-bottom";
export default function Chat({ socket, username, room }) {
  const [currmsg, setCurrMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const handleMsg = (e) => {
    setCurrMsg(e.target.value);
  };
  //   const handlekeypress = (e) => {
  //     e.key === "Enter" && handleSend();
  //   };
  // its an async function
  const handleSend = async () => {
    if (currmsg !== "") {
      // creating an object to be sent to backet via socket
      const msgData = {
        room: room,
        author: username,
        message: currmsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("Send_Msg", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrMsg("");
    }
  };

  useEffect(() => {
    socket.on("Receive_Message", (data) => {
      // add new messages to the previous messages
      setMsgList((list) => [...list, data]);
      console.log("hello");
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {msgList.map((msgContent) => {
            return (
              <>
                <div
                  className="message"
                  id={username === msgContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{msgContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msgContent.time}</p>
                      <p id="author">{msgContent.author}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currmsg}
          placeholder="Type here.."
          onChange={handleMsg}
          //   onKeyPress={handlekeypress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
