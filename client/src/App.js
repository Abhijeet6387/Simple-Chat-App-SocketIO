import "./App.css";
// install socket-io-client
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowChat] = useState(false);
  const JoinRoom = () => {
    if (username !== "" && room !== "") {
      // passing the room through socket.emit
      socket.emit("Join_Room", room, username);
      setShowChat(true);
    }
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleRoom = (e) => {
    setRoom(e.target.value);
  };
  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h1>Welcome!</h1>
          <input
            type="text"
            placeholder="Enter your name.."
            onChange={handleUserName}
          ></input>
          <input
            type="text"
            placeholder="Enter Room ID.."
            onChange={handleRoom}
          ></input>
          <button onClick={JoinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
      <Footer />
    </div>
  );
}

export default App;
