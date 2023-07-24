import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../context/UserContextProvider";
import Messages from "../Api/Mesages";
function Msgdata({ socket, username, userId, receiveId }) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { loginUser } = useContext(UserContext);

  const wrapFirstLetterInDiv = (username) => {
    const firstLetter = username.charAt(0).toUpperCase();
    return (
      <div style={{ display: "inline-block", borderRadius: "50%", width: "34px", height: "34px", textAlign: "center", lineHeight: "34px", background: "#b2bed5", color: "white", fontWeight: "bold" }}>

        {firstLetter}
      </div>
    );
  };
  const sendMessage = () => {
    console.log("loginUser", loginUser)
    if (currentMessage.trim() !== "") {
      const messageData = {
        sender: loginUser && loginUser.userId,
        receiveId: receiveId,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send-message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
      console.log("sent msg on send-message", messageData);
      setCurrentMessage("");
    }
  };



  const [UserUID, setUserUID] = useState(receiveId);
  console.log("UserUID", receiveId)


  const fetchChats = (e, receiveId) => {
    const main = new Messages();
    const resp = main.MessageList(e, receiveId);
    resp.then((res) => {
      let chat = res.data.chats
      setMessageList(chat);
      console.log("res.data.chats", chat);
    }).catch((err) => {
      console.log("err", err)
    })
  }

  useEffect(() => {
    setMessageList([]);
    if (receiveId) {
      fetchChats(receiveId);
    }
  }, [receiveId]);

  useEffect(() => {
    // fetchOldMessages();
    if (socket) {
      // Join the room corresponding to the current user ID
      socket.emit('join-room', userId);
      // Listen for incoming messages in the room
      socket.on('test-event', (data) => {
        console.log('Test event received:', data);

        // Update messageList state with the received message
        setMessageList((prevMessageList) => [...prevMessageList, data]);
      });
    }

    return () => {
      socket && socket.off("test-event");
    };
  }, [socket, userId, receiveId]);


  return (
 <>
 {username ?(<>
 

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
            className={`message mb-5 ${id === "sender" ? "sender-message" : "test-event"}`}
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



 </>)  :(<>
 < div className="msg-data-container">
 <div classMNmae="msg">
  <h1>Welcome user's</h1>
  <p>Please Select the user's for Conversions</p>
 </div>
 </div>

 </>)}
 </>


  );
}

export default Msgdata;
