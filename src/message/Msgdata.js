import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../context/UserContextProvider";
import Messages from "../Api/Mesages";
function Msgdata({ socket, username, userId, receiveId }) {
  console.log("socket",socket)
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { loginUser } = useContext(UserContext);
  console.log("loginUser", loginUser)
  const wrapFirstLetterInDiv = (username) => {
    const firstLetter = username.charAt(0).toUpperCase();
    console.log("process.env.REACT_APP_BASE_URLSocket",process.env.REACT_APP_BASE_URL)
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
        userId: loginUser && loginUser.userId,
        receiveId: receiveId,
        author: loginUser && loginUser.username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send-message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
      console.log("sent msg on send-message", messageData);
      setCurrentMessage("");
    }
  };

  const fetchChats = (e, receiveId) => {
    const main = new Messages();
    const resp = main.ListMessage(e, receiveId,userId);
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
  }, [socket, userId, receiveId, username]);


  return (
    <>
      {username ? (<>
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

              {messageList && messageList.map((msg, i) => {
                const message = msg?.message || "";
                const author = msg?.author || "";
                const id = username === author ? "send-message" : "test-event";
                return (
                  <div
                    key={i}

                    className={`message mb-5  ${id === "send-message" ? "send-message" : "test-event"}`}
                  >
                    {/* Message Content */}
                    <div className="message-content">                      
                      <div className="mesage-box">
                          <p className="meassge">{message}</p>
                          <p className="chatid" id="time">{`Receiver: ${msg.receiveId
                            }`} | {`Sender: ${msg.userId}`}</p>
                          <p className="time-msg" id="time">{msg.time}</p>
                      </div>
                      <div className="author">{msg.author}</div>
                    </div>
{/*                    
                    <div className="message-meta">
                       
                    </div> */}

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
            <button onClick={sendMessage}><i className="bi bi-send"></i></button>

          </div>
        </div>



      </>) : (<>
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