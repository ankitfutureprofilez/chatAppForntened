import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Singup from './components/Singup';
import Login from './components/Login';
import io from "socket.io-client";
import UserContextProvider from "./context/UserContextProvider";
import Reciver from './message/Reciver';
import Msgdata from './message/Msgdata';
import PrivateRoute from './Router/PrivateRoute';
import OpenAi from './openai/OpenAi';
import { useEffect } from 'react';


const socket =io("https://chat-appbackend.vercel.app");


function App() {

  useEffect(() => {
    const socket = io("https://chat-appbackend.vercel.app");
    // Socket.io events can be handled here
    // For example: socket.on('event', (data) => { /* handle the event */ });

    return () => {
      socket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, []);
  const URL=process.env.REACT_APP_BASE_URL
  console.log("REACT_APP_BASE_URL ffff",URL)

  return (
    <div>
      <UserContextProvider>
        <Router>
       
          <Routes>
            <Route path='/reg' element={<Singup/>}> </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/OpenApi" element={<PrivateRoute><OpenAi/></PrivateRoute>}></Route>
            <Route path="/msg" element={<Msgdata socket={socket}/>}></Route>
            <Route path="/" element={<PrivateRoute><Reciver/></PrivateRoute>}></Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

