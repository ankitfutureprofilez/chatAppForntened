import React, { useEffect, useState } from "react";
import Singup from "../Api/Signup";
import { Link } from "react-router-dom";

function ChatLink({ username, userId }) {
  const chatUrl = `/chat/${username}?userid=${userId}&name=${username}`;

  return (
    <Link to={chatUrl}>Chat</Link>
  );
}

function ChatLists() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const main = new Singup();
    const resp = main.List();
    resp.then((res) => {
      console.log(res.data);
      setList(res.data.data);
    });
  }, []);

  return (
    <section id="userlist">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>UserId</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((res) => (
                    <tr key={res._id}>
                      <td>{res.username}</td>
                      <td>{res.userId}</td>
                      <td>
                        <ChatLink username={res.username} userId={res.userId} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatLists;