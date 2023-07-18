import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './components/chat';
import Singup from './components/Singup';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import { Context } from './components/Context';
import ChatLists from './components/ChatLists';
import UserContextProvider, { UserContext } from './context/UserContextProvider';
import PrivateRoute from './Api/PrivateRoute';
function App() {
  // const [loginname, setLoginname] = useState(localStorage.getItem('loginname'))
  // const [loginuserid, setLoginuserId] = useState(localStorage.getItem('loginuserid'))
  ///const { setSocketIO } = useContext(UserContext);
  const socket = io.connect("http://localhost:5000")
  useEffect(() => {
    if (socket) {
      // setSocketIO(socket)
    }
  }, []);
  return (
    <div>
      <UserContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/chats' element={<PrivateRoute><ChatLists /></PrivateRoute>}></Route>
            <Route path='/chat/:username' element={<Chat socket={socket} />} />
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

