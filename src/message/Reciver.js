import React, { useContext, useState } from "react";
import { io } from 'socket.io-client';
import Msgdata from "./Msgdata";
import { UserContext } from "../context/UserContextProvider";
import { useEffect } from "react";
import Singup from "../Api/Signup";

const socket = io.connect("http://localhost:8080");

function Reciver(props) {
    const [showchat, setshowchat] = useState(false);
    const [list, setList] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        const main = new Singup();
        const resp = main.List();
        resp.then((res) => {
            console.log(res.data);
            setList(res.data.data);
        });
    }, []);

    // Function to handle the button click and set selected username and userId
    const handleSendButtonClick = (username, userId) => {
        // Perform any actions you need with the selected username and userId
        if (username !== "" && userId !== "") {
            setSelectedUsername(username);
            setSelectedUserId(userId);
            socket.emit("join-room", userId);
            setshowchat(true);
        }
    };

    return (
        <div className="app">
            {!showchat ? (
                <div className="joinChatContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Join The Chat</h3>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>UserId</th>
                                            <th>Button</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((User) => (
                                            <tr key={User.userId}>
                                                <td>{User.username}</td>
                                                <td>{User.userId}</td>
                                                <td>
                                                    <button onClick={() => handleSendButtonClick(User.username, User.userId)}>Send</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Msgdata socket={socket} username={selectedUsername} userId={selectedUserId} />
            )}
        </div>
    );
}

export default Reciver;
