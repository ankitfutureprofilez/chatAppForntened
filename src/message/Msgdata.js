import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Msgdata({ socket, username, userId }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            const messageData = {
                userId: userId,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString(),
            };
            socket.emit("send-message", messageData);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive-message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        return () => {
            socket.off("receive-message");
        };
    }, [socket]);

    return (
        <div className="chat-window">
        <div className="chat-header">
          <h3>Live Chat</h3>
          {username}
          {userId}
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((msg, i) => {
              const message = msg?.message || "";
              const author = msg?.author || "";
              const id = username === author ? "you" : "other";
    
              return (
                <div
                  key={i}
                  className={`message ${id === "you" ? "you-message" : "other-message"}`}
                >
                  {/* Message Content */}
                  <div className="message-content">
                    <p>{message}</p>
                  </div>
                  
                  {/* Message Metadata */}
                  <div className="message-meta">
                    <p id="time">{msg.time}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{msg.author}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}><i class="bi bi-send"></i></button>
        </div>
      </div>
  
    );
}

export default Msgdata;
