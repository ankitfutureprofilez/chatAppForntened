import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Singup from './components/Singup';
import Login from './components/Login';
import PrivateRoute from './Api/PrivateRoute';
import UserContextProvider, { UserContext } from "./context/UserContextProvider";
import Msgdata from './message/Msgdata';
import Reciver from './message/Reciver';

function App() {
  const socket = io.connect("http://localhost:8080/api")
  return (
    <div>

      <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/Mesg" element={
                <Msgdata />
            
            }></Route>
            <Route path="/Join" element={
           
                <Reciver />
            
            }></Route>
            {/* // <PrivateRoute path="/Mesg" element={   <Msgdata />} />

            //    <PrivateRoute path="/Join" element={  <Reciver />} /> */}
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

