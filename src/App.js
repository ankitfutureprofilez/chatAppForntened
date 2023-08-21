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
import Multer from './openai/Multer';
import Regex from './components/Regex';


// const socket =io("https://chat-appbackend.vercel.app");


function App() {

  useEffect(() => {
    // const socket = io("https://chat-appbackend.vercel.app");
    // Socket.io events can be handled here
    // For example: socket.on('event', (data) => { /* handle the event */ });

    return () => {
      // socket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, []);
  const URL = process.env.REACT_APP_BASE_URL
  console.log("REACT_APP_BASE_URL ffff", URL)

  return (
    // <div>
    //     <div className="container">
    //   <div className="content">
    //     <h1>My Responsive PWA</h1>
    //     <p>Welcome to my Progressive Web App.</p>
    //   </div>
    // </div>
    <div>
       <UserContextProvider>
        <Router>
          <Routes>
            <Route path ="/aaa" element ={<Regex/>}></Route>
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/' element={<Login />}></Route>
            <Route path= "/multer" element={<Multer/>}></Route> 
            <Route path="/ai" element={<OpenAi />}></Route>
            <Route path="/msg" element={<Msgdata />}></Route>
            <Route path="/join" element={<PrivateRoute><Reciver /></PrivateRoute>}></Route>
          </Routes>
        </Router>
      </UserContextProvider> 
    </div>

  );
}

export default App;

