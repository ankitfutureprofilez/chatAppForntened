import { useContext, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../context/UserContextProvider";
import OpenAis from "../Api/OpenAi";
import Header from "../components/Header";

function OpenAi() {
  const [userQuestion, setUserQuestion] = useState('');
  const [assistantAnswer, setAssistantAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const { loginUser } = useContext(UserContext);
  console.log("loginUser", loginUser)
 

  async function handleQuestionSubmit(e) {
    e.preventDefault();
    const Main = new OpenAis();
    const resp = Main.OpenAiChat({ question: userQuestion })
    resp.then((res) => {
      console.log("res.data.data", res.data.data)
      setAssistantAnswer(res.data.data);

      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { userQuestion, assistantAnswer: res.data.data }
      ]);
    }).catch((err) => {
      console.log("login err", err)
    });
  }
  return (
    <>
      <section id="chat">
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <Header />
            </div>
            <div className="col-md-11">
              <div className="chat-window">
                {/* Chat Header */}
                <div className="chat-header">
                  <h3>Live Ai  Chat</h3>
                  <div className="d-flex align-items-center">
                    <div className="user-avatar">
                    
                    </div>
                    <div className="user-details ps-2">
                      <h6 className="mb-0 text-capitalize" >{loginUser.username}</h6>
                    </div>
                  </div>
                </div>
                {/* Chat Body */}
                <div className="chat-body">
                  <ScrollToBottom className="message-container">
                    {/* Display the chat history */}
                    {chatHistory.map((chat, index) => (
                      <>
                      <div key={index} className={"message mb-5"}>
                        {/* User's Message */}
                        <div className="message-content">
                          <div className="message-box">
                            <p className="message">
                              {chat.userQuestion}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div key={index + 1000} className={"message mb-5 sender"}>
              {/* AI Assistant's Message */}
              <div className="message-content">
                <div className="message-box">
                  <p className="message">
                    {chat.assistantAnswer}
                  </p>
                </div>
             
            </div>
            </div>
                      </>
                    ))}
                  </ScrollToBottom>
                </div>

                {/* Chat Footer */}
                <div className="chat-footer">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                  <button onClick={handleQuestionSubmit}>
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OpenAi;