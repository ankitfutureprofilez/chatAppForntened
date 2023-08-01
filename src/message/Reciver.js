import React, { useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client';
import Msgdata from "./Msgdata";
import Singup from "../Api/Signup";
import ListGroup from 'react-bootstrap/ListGroup';
import { MDBCol } from "mdbreact";
import Header from "../components/Header";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";


function Reciver(props) {
    const { loginUser } = useContext(UserContext);
  
  // const userss= (loginUser.userId)
   console.log(loginUser)
    const [showchat, setshowchat] = useState(false);
    const [list, setList] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectRecive, setSelectrecive] = useState("")
    const socketRef = useRef(null);
    let socket = socketRef.current;
    const Socketurl=process.env.REACT_APP_BASE_URL
    console.log("Socketurl",Socketurl)
    socket = io.connect("Socketurl");

    // Helper function to wrap the first letter of a username in a <div>
    const wrapFirstLetterInDiv = (username) => {
      const firstLetter = username.charAt(0).toUpperCase();
     
        return (
            <div style={{ display: "inline-block", borderRadius: "50%", width: "34px", height: "34px", textAlign: "center", lineHeight: "34px", background: "#b2bed5", color: "white", fontWeight: "bold" }}>

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
    const handleSendButtonClick = (username, userId, receiverId) => {
        //  console.log("axsdassfdfdg")
        // Perform any actions you need with the selected username and userId
        if (username !== "" && userId !== "") {
            setSelectedUsername(username);
            setSelectedUserId(userId);
            setSelectrecive(userId);
            socket.emit("join-room", receiverId);
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
                <div className="sidebar-chats">
                    <div className="px-4 pt-4">
                        <h4 className="mt-0 mb-4">Chats</h4>
                        <MDBCol className="mb-3">
                            <input className="mb-3 form-control mt-2 mb-2" type="text" placeholder="Search" aria-label="Search" />
                        </MDBCol>
                    </div>
                    <div className="px-2">

                        <div ref={listRef} className="chat-message-list">
                            <ListGroup as="ul" className="border-0" >
                                {list && list.map((User) => (
                                    <ListGroup.Item  
                                    className={(loginUser && loginUser.userId) === (User  &&  User.userId) ? `d-none` : ''} 
                                      as="li" key={User.userId} onClick={() => handleSendButtonClick(User.username, User.userId)}>
                                        {/* Use the helper function to display the modified username */}
                                        <div className="rightactions d-flex align-items-center" >
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
                </div>
                <div className="chat_panel">
                    <Msgdata socket={socket} username={selectedUsername} userId={selectedUserId} receiveId={selectRecive} /></div>
            </div>
        </section>
    );
}

export default Reciver;

