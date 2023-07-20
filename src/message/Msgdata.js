import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
function Msgdata({ socket, username, userId }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    console.log(username, userId)
    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
          const messageData = {
            userId: userId,
            author: username,
            message: currentMessage,
            time: new Date().toLocaleTimeString(),
          };
      
          socket.emit("send-message", messageData);
          console.log("Send",messageData)
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
      };
      

    useEffect(() => {
        socket.on("receive-message", (data) => {
            console.log("rec",data)
          //  setMessageList((list) => [...list, data]);
        });
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
                    {messageList.map((messageContent) => (
                        <div
                            className="message"
                            id={username === messageContent.author ? "you" : "other"}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>

                    ))

                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="hello" onChange={(e) => { setCurrentMessage(e.target.value) }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>


    )
}

export default Msgdata;