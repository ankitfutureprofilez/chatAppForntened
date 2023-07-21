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
            console.log("Send", messageData);
            //  setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive-message", (data) => {
            console.log("list1", messageList)
            setMessageList((list) => [...list, data]);
            console.log("appended", data);
            console.log("list2", messageList)
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
                    {messageList.map((messageContent) => {
                        // Add null checks before accessing the message and author properties
                        const message = messageContent?.message || "";
                        const author = messageContent?.author || "";
                        const id = username === author ? "you" : "other";

                        return (
                            <div className="message" id={id} >
                                <div>
                                    <div className="message-content">
                                        <p>{message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time"></p>
                                        <p id="author">{author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="hello"
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Msgdata;
