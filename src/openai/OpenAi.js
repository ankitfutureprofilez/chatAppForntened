import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from "../context/UserContextProvider";
import OpenAis from "../Api/OpenAi";
import Header from "../components/Header";

function OpenAi({ socket, username, userId, receiveId }) {
    const [userQuestion, setUserQuestion] = useState('');
    const [assistantAnswer, setAssistantAnswer] = useState('');

    const { loginUser } = useContext(UserContext)
    console.log(loginUser)


    async function handleQuestionSubmit(e) {
        e.preventDefault();
        const Main = new OpenAis();
        const resp = Main.OpenAiChat({ question: userQuestion })
        resp.then((res) => {
            console.log("res.data.data", res.data.data)
            setAssistantAnswer(res.data.data);
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
                    <h3>Live Chat</h3>
                    <div className="d-flex align-items-center">
                      <div className="user-avatar">
                        {/* User Avatar */}
                      </div>
                      <div className="user-details ps-2">
                        <h6 className="mb-0 text-capitalize"></h6>
                        <p className="mb-0">{userId}</p>
                      </div>
                    </div>
                  </div>
      
                  {/* Chat Body */}
                  <div className="chat-body">
                    <ScrollToBottom className="message-container">
                      <div className={"message mb-5"}>
                        {/* Message Content */}
                        <div className="message-content">
                          <div className="message-box">
                            <p className="message">
                              {assistantAnswer}
                            </p>
                          </div>
                          <div className="author">
                            {/* Author Information */}
                          </div>
                        </div>
                        <div className="message-meta">
                          {/* Message Meta Data */}
                        </div>
                      </div>
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