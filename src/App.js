import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './components/chat';
import Singup from './components/Singup';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import ChatLists from './components/ChatLists';
import PrivateRoute from './Api/PrivateRoute';
import UserContextProvider, { UserContext } from "./context/UserContextProvider";
import Messages from './Api/Mesages';
import Chatmessage from './components/message';

function App() {
const socket=io.connect("http://localhost:8080/api")
  return (
    <div>

      <UserContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/message' element={<Chatmessage socket={socket}/>}></Route>
            <Route path='/chats' element={<PrivateRoute><ChatLists /></PrivateRoute>}></Route>
            <Route path='/chat/:username' element={<Chat />} />
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
          <Footer />
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

