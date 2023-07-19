import React, { useEffect, useState, useRef, useContext } from "react";
import Messages from "../Api/Mesages";
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { UserContext } from "../context/UserContextProvider";

function Chat() {
  const { loginUser } = useContext(UserContext);

  const search = useLocation().search;
  const userid = new URLSearchParams(search).get('userid');
  const username = new URLSearchParams(search).get('name');

  const [messages, setMessages] = useState('');
  const [chat, setChat] = useState([]);
  const [socketId, setSocketId] = useState(""); // New state for socket ID

  const messageListRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);


  const [message, setMessage] = useState([])
  const socket = io.connect('http://localhost:8080/api');
  useEffect(() => {
    // Handle incoming chat messages from the se
    socket.on('user-1', (data) => {
      console.log('Received chat message:', data);
    });

    return () => {
      socket.disconnect();
    };
  },[]);


  // const handleSendMessage = (message) => {
  //   socket.emit('chat message', message);
  // }

  // useEffect(() => {
  // let socket =socketRef&&socketRef.current;
  //   socket= io("http://localhost:5000");
  //   socket.on(`connect`, () => {
  //     console.log('Socket connected');
  //     setSocketId(socket.id); // Set the socket ID
  //   });
  //   socket.on('message', ({ message, userid }) => {
  //     console.log('Received message:', message);
  //     console.log('User ID:', userid);
  //     // Process the message and user ID as needed
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  function handleSubmit() {
    // socket.emit('chatMessage', message);
    setMessages("");
    if (!messages) {
      return;
    }
   
    // const main = new Messages();
    // const formData = new FormData();
    // formData.append("message", messages);
    // formData.append("userid", userid);

    // const chatInstance = main.MessageChat(formData);
    // chatInstance
    //   .then((res) => {
    //     console.log(res);
    //     setMessages("");
    //     // socketRef.current.emit('message', { message: res.data.message, userid }); // Emit the message and userid
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const handleChat = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      setMessages(e.target.value);
    }
  };

  // useEffect(() => {
  //   const main = new Messages();
  //   const resp = main.MessageChatShow();
  //   resp
  //     .then((res) => {
  //       setChat(res.data.data);
  //       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    inputRef.current.focus();
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [chat, messages]);

  return (
    <section id="chat">
      <div className='chat warpper'>
        <div className="chats-list mt-2">
          <h6>
            Username: {username} UserID: {userid}
          </h6>
        
          <div ref={messageListRef} style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="message-container">
              {chat.map((res, i) => (
                <div key={i}>
                  <div className="message-content">{res.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='chats-actions d-flex align-items-center justify-content-center'>
          <input
            type="text"
            ref={inputRef}
            value={messages}
            placeholder="Enter the message"
            name="messages"
            onChange={handleChat}
            onKeyDown={handleChat}
          />
        </div>
      </div>
    </section>
  );
}

export default Chat;

