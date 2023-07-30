import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../context/UserContextProvider";
import Messages from "../Api/Mesages";
function Msgdata({ socket, username, userId, receiverId }) {
console.log("socket, username, userId, receiveId",socket, username, userId, receiverId)
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { loginUser } = useContext(UserContext);
  console.log("loginUser", loginUser)
  const wrapFirstLetterInDiv = (username) => {
    const firstLetter = username.charAt(0).toUpperCase();
    return (
      <div style={{ display: "inline-block", borderRadius: "50%", width: "34px", height: "34px", textAlign: "center", lineHeight: "34px", background: "#b2bed5", color: "white", fontWeight: "bold" }}>

        {firstLetter}
      </div>
    );
  };
  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        userId: loginUser && loginUser.userId,
        receiverId: receiverId,
        username: loginUser && loginUser.username, // Add the username to the message data
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send-message', messageData); // Emit 'send-message' event
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
      console.log("sent msg on send-message", messageData);
      setCurrentMessage("");
    }
  };

  const fetchChats = (e, receiveId) => {
    const main = new Messages();
    const resp = main.ListMessage(e, receiveId);
    console.log(resp)
    resp.then((res) => {
      console.log("chat res", res)
      let chat = res.data.chats
      setMessageList(chat);
      console.log("res.data.chats", chat);
    }).catch((err) => {
      console.log("err", err)
    })
  }

  useEffect(() => {
    setMessageList([]);
    if (receiverId) {
      fetchChats(receiverId);
    }
  }, [receiverId]);

  // Use 'send-message' instead of 'test-event' in useEffect to listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('test-event', (data) => {
        console.log('test-event:', data);
        setMessageList((prevMessageList) => [...prevMessageList, data]);
      });
    }
    return () => {
      if (socket) {
        socket.off('test-event');
      }
    };
  }, [socket]);



  return (
    <>
      {username ? (
        <div class="chat-window">
          <div class="chat-header">
            <h3>Live Chat</h3>
            <div class="d-flex align-items-center">
              <div class="user-avatar">
                {wrapFirstLetterInDiv(username)}
              </div>
              <div class="user-details ps-2">
                <h6 class="mb-0 text-capitalize" >{username}</h6>
                <p class="mb-0" >{userId}</p>
              </div>
            </div>
          </div>
          <div class="chat-body">
            <ScrollToBottom class="message-container">
              {messageList && messageList.map((msg, i) => {
                const message = msg?.message || "";
                const author = msg?.username || ""; // Change 'author' to 'username'
                const id = loginUser && loginUser.username === author ? "sender" : "receiver";
                return (
                  <div
                    key={i}
                    class={`message mb-5  ${id === "sender" ? "send-message" : "test-event"}`}
                  >
                    <div class="message-content">
                      <div className="message-box">
                        <p className="message">{message}</p>
                        <p class="chatid" id="time">{`Receiver: ${msg.receiverId}`} | {`Sender: ${msg.userId}`}</p>
                        <p class="time-msg" id="time">{msg.time}</p>
                      </div>
                      <div className="author">{msg.username}</div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div class="chat-footer">
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
      ) : (
        <div class="msg-data-container">
          <div classMNmae="msg">
            <h1>Welcome user's</h1>
            <p>Please Select the user's for Conversions</p>
          </div>
        </div>
      )}
    </>


  );
}

export default Msgdata;
