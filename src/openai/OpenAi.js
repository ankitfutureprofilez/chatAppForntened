import React, { useState, useRef, useMemo } from "react";
// import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import OpenAis from "../Api/OpenAi";

function OpenAi() {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false)

  const messageRef = useRef();
  function scrollToBottom(e) {
    if (e && e.current) {
      e.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end'
      });
    }
  }


  function renderTextWithLinks(text) {
    console.log("text", text);
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const parts = [];
    let match;
    while ((match = new RegExp(`(${linkRegex.source}|${emailRegex.source})`).exec(text)) !== null) {
      const beforeText = text.slice(0, match.index);
      if (beforeText) {
        parts.push(<span key={parts.length}>{beforeText}</span>);
      }
      const linkOrEmail = match[0];
      if (linkOrEmail.match(linkRegex)) {
        parts.push(
          <a href={linkOrEmail} key={parts.length} target="_blank" rel="noopener noreferrer">
            {linkOrEmail}
          </a>
        );
      } else if (linkOrEmail.match(emailRegex)) {
        parts.push(
          <a href={`mailto:${linkOrEmail}`} key={parts.length}>
            {linkOrEmail}
          </a>
        );
      }
      text = text.slice(match.index + match[0].length);
    }
    if (text) {
      parts.push(<span key={parts.length}>{text}</span>);
    }
    return parts;
  }
  
  function convertLineBreak(e) {
    const text = e.toString();
    if (text) {
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {renderTextWithLinks(line)}
          <br />
        </React.Fragment>
      ));
    } else {
      return null;
    } 
  }
  
  
  useMemo(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000);

    setTimeout(() => {
      setChatHistory((prev) => [...prev, {
        sender: false,
        content: "Hi 👋 I'm an AI Assistant trained on our company information. How can I help you?"
      }]);
      setLoading(false)
    }, 2000);
  }, []);


  const [prevQuestion, setPrevQuestion] = useState();
  const [prevAnswer, setPrevAnswer] = useState();
  async function handleQuestionSubmit(e) {
    e.preventDefault();
    let question = userQuestion;
    setUserQuestion('');
    setLoading(true);
    setChatHistory((prev) => [...prev, {
      sender: true,
      content: userQuestion
    }]);
    setTimeout(() => {
      scrollToBottom(messageRef);
    }, 500);
    const Main = new OpenAis();
    const resp = Main.OpenAiChat({ question: question, memory:prevQuestion, ans:prevAnswer})
    resp.then((res) => {
      if (res.data.data) {
        console.log("res.data.data", res.data.data)
        setTimeout(() => {
          setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            {
              sender: false,
              content: res.data.data,
            }
          ]);
          setPrevAnswer(res.data.data)
          setLoading(false);
          setTimeout(() => {
            scrollToBottom(messageRef);
          }, 200);
        }, 800);
        setPrevQuestion(question);
      } else {
        setChatHistory(pv => [
          ...pv,
          {
            sender: false,
            content: "Sorry !! I can't help you at that moment."
          }
        ]);
        setLoading(false);
      }
    }).catch((err) => {
      console.log("login err", err)
    });
  }

  return (
    <>
      <section className="livechat px-3 m-auto">
        <div className="chat-window">
          {/* Chat Header */}
          <div className="chat-header d-flex align-items-center">
          <img src="logo.png" height="50px" alt="Logo" className="logo-img" />
          <div>
              <h3>AI ASSITANT</h3>
          </div>
          
          </div>
          {/* Chat Body */}
          <div className="chat-body">
            <div className="message-container pt-5" ref={messageRef}>
              {chatHistory.map((chat, index) => (
                <div key={`${index}-chat-message`} className={`chatmsg-${index} message pb-3 pt-3 ${chat.sender ? 'sender' : ''}`}>
                  <div className="message-content">
                    <div className="message-box">
                      <p className="message">
                      {convertLineBreak(chat.content)}
                        {/* {renderTextWithLinks(chat.content)} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {chatHistory.length < 1 ? (
                <div className="w-100 welcomeMsg">
                  <p className="mb-0">Welcome to <br />Future Profilez AI Assistant</p>
                </div>
              ) : ''}
              {loading ? (
                <div key={`chat-message`} className={`message pb-5 `}>
                  <div className="message-content ">
                    <div className="message-box">
                      <p className="message">
                        <div className="snippet ms-3" data-title="dot-flashing">
                          <div className="stage my-3 px-3">
                            <div className="dot-flashing"></div>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              ) : ''}

            </div>
          </div>

          {/* Chat Footer */}
          <form onSubmit={handleQuestionSubmit}>
            <div className="chat-footer">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="How may I help you !!"
              />
              <button type="submit">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default OpenAi;