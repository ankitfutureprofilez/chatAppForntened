import React, { useEffect, useState, useRef, useContext } from "react";
import Messages from "../Api/Mesages";
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom'
import { UserContext } from "../context/UserContextProvider";
function Chat(props) {
  const { socketIO, loginUser } = useContext(UserContext);

  const search = useLocation().search;
  const userid = new URLSearchParams(search).get('userid');
  const username = new URLSearchParams(search).get('name');

  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);

  const loginuserid= loginUser && loginUser.userId;
  const loginname= loginUser && loginUser.username;

  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if(socketIO){
      socketIO.on('user-1', (data) => {
        console.log('Message Recived', data);
      });
    }
  }, [socketIO]);

  function handleSubmit() {
    const main = new Messages();
    const formData = new FormData();
    formData.append("message", messages);
    formData.append("userid", userid);
    const Chatss = main.MessageChat(formData);
    Chatss.then((res) => {
      console.log(res);
      setMessages("");
      setChat(data => [...data, res.data.message]);
      if(socketIO){
        console.log("Has socket")
        socketIO.emit('user-1', "heelo from 1");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleChat = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      setMessages(e.target.value);
    }
  };

  useEffect(() => {
    const main = new Messages();
    const resp = main.MessageChatShow();
    resp.then((res) => {
      setChat(res.data.data)
      //   console.log(res.data.userId)
      //   scrollToBottom();
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    inputRef.current.focus();
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [chat, messages]);


  return (
    <section id="chat">
      <div className='chat warpper'>
        <div className="chats-list  mt-2">

          <h6>USername:{username} USerId: {userid}</h6>
          <div ref={messageListRef}
            style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="message-container" >
              {chat && chat.map((res, i) => (
                <div key={i} >
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
            placeholder="enter the message"
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
