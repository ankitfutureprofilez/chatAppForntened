import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";


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
      console.log("send-mse",messageData)
      setCurrentMessage("");
    }
  };

  // const fetchChatHistory = async () => {
  //   try {
  //     const response = await axios.get(`/api/chat-history/${userId}`);
  //     const messages = response.data.messages;
  //     setMessageList(messages);
  //   } catch (error) {
  //     console.log("Error fetching chat history:", error);
  //   }
  // };



  const wrapFirstLetterInDiv = (username) => {
    const firstLetter = username.charAt(0).toUpperCase();
    return (
      <div style={{ display: "inline-block", borderRadius: "50%", width: "34px", height: "34px", textAlign: "center", lineHeight: "34px", background: "#b2bed5", color: "white", fontWeight: "bold" }}>

        {firstLetter}
      </div>
    );
  };

  useEffect(() => {

   // fetchChatHistory();
    socket.on("receive-message", (data) => {
      console.log("senreceive-messaged-mse",data)

      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, userId]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <div className="d-flex align-items-center">
          <div className="user-avatar">
            {wrapFirstLetterInDiv(username)}
          </div>

          <div className="user-details ps-2">
            <h6 className="mb-0 text-capitalize" >{username}</h6>
            <p className="mb-0" >{userId}</p>
          </div>
        </div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg, i) => {
            const message = msg?.message || "";
            const author = msg?.author || "";
            const id = username === author ? "sender" : "reciver";

            return (
              <div
                key={i}
                className={`message mb-5 ${id === "sender" ? "sender-message" : "reciver-message"}`}
              >
                {/* Message Content */}
                <div className="message-content">
                  <strong>{msg.author}</strong>
                  <p>{message}</p>
                </div>
                <div className="message-meta">
                  <p className="mb-0 p-1 text-small text-muted" id="time">{msg.time}</p>
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
