import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContextProvider";
import Messages from "../Api/Mesages";
function Msgdata({socket,  username, userId, receiveId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { loginUser } = useContext(UserContext);
  console.log("loginUser", loginUser)


  const scrollbot = useRef(null);
  function scrollToBottom() {
    {scrollbot && scrollbot.current &&
      setTimeout(()=>{
        scrollbot.current.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'end'
          });   
        },1000)
    }
}

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
        sender:true,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send-message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
      console.log("sent msg on send-message", messageData);
      setCurrentMessage("");
      scrollToBottom();
    }
  };


  const [loading, setLoading] = useState(false);
  const fetchChats = (e, receiveId) => {
    const main = new Messages();
    setLoading(true)
    const resp = main.ListMessage(e, receiveId,userId);
    resp.then((res) => {
      console.log("chat res", res)
      let chat = res.data.chats
      setMessageList(chat);
    setLoading(false);
      console.log("res.data.chats", chat);
    }).catch((err) => {
      console.log("err", err)
    setLoading(false);
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
        scrollToBottom();
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

            <div ref={scrollbot}  className="message-container pb-5">
              {loading && <div className="text-center p-5" >Chats Loading....</div>}
              {messageList && messageList.map((msg, i) => {
                const message = msg?.message || "";
                const author = msg?.author || "";
                const id = username === author ? "send-message" : "test-event";
                return (
                  <div key={i}
                    className={` ${msg.sender? "sender" : ''} message mb-4   ${id === "send-message" ? "send-message" : "test-event"}`}
                  >
                    {/* Message Content */}
                    <div className="message-content">                      
                      <div className="mesage-box">
                          <p className="meassge">{message}</p>
                          {/* <p className="chatid" id="time">{`Receiver: ${msg.receiveId
                            }`} | {`Sender: ${msg.userId}`}</p> */}
                          {/* <p className="time-msg text-small" id="time">{msg.time}</p> */}
                      </div>
                      {/* <div className="author">{msg.author}</div> */}
                    </div>
{/*                    
                    <div className="message-meta">
                       
                    </div> */}

                  </div>
                );
              })}
            </div>



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