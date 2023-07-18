import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import Chat from './components/chat';
import Singup from './components/Singup';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import { Context } from './components/Context';
import UserList from './components/UserList';
const socket = io.connect("http://localhost:5000")

function App() {
  const [loginname, setLoginname] = useState(localStorage.getItem('loginname'))
  const [loginuserid, setLoginuserId] = useState(localStorage.getItem('loginuserid'))

  socket.on("Data",(data)=>{console.log(data)})
  useEffect(() => {
    // Handle incoming chat messages from the server
    if(socket){ 
        socket.on('hellouser', (data) => {
        console.log('Received chat message:', data);
        // Update your React component with the received data
      });
    }
    return () => {
      socket.disconnect();
    };
  },[]);

  return (
    <div>
      <Context.Provider value={{ loginname, setLoginname, loginuserid, setLoginuserId }}>
        <Router>
          <Header />

          <Routes>
<Route path='/chats' element={<UserList/>}></Route>
            <Route path="/chat/naveen/?userid=2&name=naveen" element={<Chat socket={socket} />}></Route>
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
          <Footer />
        </Router>
      </Context.Provider>
    </div>

  );
}

export default App;

