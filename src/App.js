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
const socket = io.connect('http://localhost:8080');

function App() {
  const [loginname, setLoginname] = useState(localStorage.getItem('loginname'))
  const [loginuserid, setLoginuserId] = useState(localStorage.getItem('loginuserid'))


  useEffect(() => {
    // Handle incoming chat messages from the server
    socket.on('chatMessage', (data) => {
      console.log('Received chat message:', data);
      // Update your React component with the received data
    });


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
            <Route path="/chat" element={<Chat />}></Route>

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

