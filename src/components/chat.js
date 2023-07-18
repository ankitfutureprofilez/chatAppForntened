import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "./Context";
import Messages from "../Api/Mesages";
import io from 'socket.io-client';
import { Prev } from "react-bootstrap/esm/PageItem";

function Chat(props) {

  // Changed variable name from 'setMessage' to 'setMessages' for better clarity
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);
  const { loginname, loginuserid } = useContext(Context)

  const messageListRef = useRef(null);

  const inputRef = useRef(null);
  const socket = props.socket;


 useEffect(() => {
   //Handle incoming chat messages from the server
    socket.on(`user${loginuserid}`, (data) => {
      console.log('Message Recived', data );
      setChat(Prev => [...Prev, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit() {
    const main = new Messages();
    const formData = new FormData();
    formData.append("message", messages);
    const Chatss = main.MessageChat(formData);
    Chatss.then((res) => {
      console.log(res);
      setMessages("");
      setChat(data => [...data, res.data.message]);
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

          <h6>Username:{loginname}   UserId:{loginuserid}</h6>
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
