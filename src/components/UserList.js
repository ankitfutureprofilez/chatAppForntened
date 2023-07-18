import { useEffect } from "react";
import Singup from "../Api/Signup";
import { useState } from "react";

function UserList() {
    const [list, setList] = useState([])
    // useEffect(() => {
    //     const main = new Messages();
    //     const resp = main.MessageChatShow();
    //     resp.then((res) => {
    //       setChat(res.data.data)
    //       //   console.log(res.data.userId)
    //       //   scrollToBottom();
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    //   }, [])

    useEffect(() => {
        const main = new Singup();
        const resp = main.List();
        resp.then((res) => {
            console.log(res.data)
            setList(res.data.data)
        })
    }, [])
    return (
        <section id="/userlist">
            <div className="container">
                <div className="row">
                    <div col-md-12>

                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        UserId
                                    </th>
                                    <th>
                                        Chat
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list && list.map((res) => (
                                    <tr key={res._id}>
                                        <td>{res.username}</td>
                                        <td>{res.userId}</td>
                                      <button> <td>Chat</td></button> 
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

export default UserList;