import { useContext, useState,useRef,useMemo   } from "react";
// import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import { UserContext } from "../context/UserContextProvider";
import OpenAis from "../Api/OpenAi";
import Header from "../components/Header";

function OpenAi() {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading]= useState(false)
  
  const messageRef = useRef();
  function scrollToBottom(e) {
    if(e && e.current){
        e.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'end'
        });   
    }
  } 

  useMemo(()=>{
    setTimeout(()=>{
      setLoading(true)
    }, 3000);

    setTimeout(()=>{
      setChatHistory((prev)=>[...prev, { 
        sender: false,
        content: "I'm Future Profilez AI Assistant. How may i help you !!"
      }]);
      setLoading(false)
    }, 5000);
  }, []);

  const renderTextWithLinks = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    return text && text.split(linkRegex).map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a href={part} key={index} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  async function handleQuestionSubmit(e) {
    e.preventDefault();
    let question = userQuestion;
    setUserQuestion('');
    setLoading(true);
    setChatHistory((prev)=>[...prev, { 
      sender: true,
      content: userQuestion
    }]);
    setTimeout(()=>{
      scrollToBottom(messageRef);
    }, 500);
    const Main = new OpenAis();
    const resp = Main.OpenAiChat({ question: question })
    resp.then((res) => {
      if(res.data.data){
        setTimeout(()=>{
          setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { 
              sender: false,
              content: res.data.data
            }
          ]);
          setLoading(false);
          setTimeout(()=>{
            scrollToBottom(messageRef);
          }, 200);
        },800);
        
      }  else{
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
            <div className="chat-header">
              <h3>FP GPT</h3>
            </div>
            {/* Chat Body */}
            <div className="chat-body">
              <div  className="message-container pt-5" ref={messageRef}  >
                {chatHistory.map((chat, index) => (
                  <div key={`${index}-chat-message`} className={`chatmsg-${index} message pb-3 pt-3 ${chat.sender ? 'sender':''}`}>
                    <div className="message-content">
                      <div className="message-box">
                        <p className="message">{renderTextWithLinks(chat.content)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {chatHistory.length < 1 ? <>
                  <div className="w-100 welcomeMsg" >
                    <p className="mb-0" >Welcome to <br></br>Future Profilez AI Assistant</p>
                  </div>
                </> :''}
                {loading ? <div key={`chat-message`} className={`message pb-5 `}>
                  <div className="message-content ">
                    <div className="message-box">
                      <p className="message">
                        <div class="snippet ms-3" data-title="dot-flashing">
                          <div class="stage my-3 px-3">
                            <div class="dot-flashing"></div>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </div> :''}
              </div>
            </div>

            {/* Chat Footer */}
            <form onSubmit={handleQuestionSubmit}>
                <div className="chat-footer">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="How may i help you !!"
                  />
                  <button type="submit" >
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