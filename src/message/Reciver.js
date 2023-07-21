import React, { useContext, useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client';
import Msgdata from "./Msgdata";
import { UserContext } from "../context/UserContextProvider";
import Singup from "../Api/Signup";
import ListGroup from 'react-bootstrap/ListGroup';
import { MDBCol } from "mdbreact";
import Header from "../components/Header";


function Reciver(props) {
    const [showchat, setshowchat] = useState(false);
    const [list, setList] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");

    const socket = io.connect("http://localhost:8080");

    // Helper function to wrap the first letter of a username in a <div>
    const wrapFirstLetterInDiv = (username) => {
        const firstLetter = username.charAt(0).toUpperCase();
        return (
            <div style={{ display: "inline-block", borderRadius: "50%", width: "30px", height: "30px", textAlign: "center", lineHeight: "25px", background: "gray", color: "white", fontWeight: "bold" }}>
                {firstLetter}
            </div>
        );
    };
    const listRef = useRef(null);
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
        console.log("axsdassfdfdg")
        // Perform any actions you need with the selected username and userId
        if (username !== "" && userId !== "") {
            setSelectedUsername(username);
            setSelectedUserId(userId);
            socket.emit("join-room", userId);
            setshowchat(true);
        }
    };

    return (
        <section id="app">
            <div className="chat-wrapper">
                    <div className="sidebar">
                        <div className="sidebar-content">
                        <Header />
                        </div>
                    </div>
                    <div  className="sidebar-chats">
                        <h4 className="text-start mt-4 mb-2">Chats</h4>
                        <MDBCol md="12">
                            <input className="mb-3 form-control mt-2 mb-2" type="text" placeholder="Search" aria-label="Search" />
                        </MDBCol>
                    
                        <div ref={listRef} style={{ overflowY: "scroll", maxHeight: "400px" }}>
                            <ListGroup as="ul" className="border-0" >
                                {list.map((User) => (
                                    <ListGroup.Item as="li" key={User.userId} onClick={() => handleSendButtonClick(User.username, User.userId)}>
                                        {/* Use the helper function to display the modified username */}
                                        
                                        <div className="rightactions d-flex align-items-center mt-2 mb-3 " >
                                            <div className="user-avatar">
                                            {wrapFirstLetterInDiv(User.username)}
                                            </div>
                                              
                                            <div className="user-details ps-2">
                                                <h6 className="mb-0 text-capitalize" >{User.name}</h6>
                                                <p className="mb-0" >@{User.username}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                    <div  className="chat_panel">
                        <Msgdata socket={socket} username={selectedUsername} userId={selectedUserId} />
                    </div>
            </div>
        </section>
    );
}

export default Reciver;
