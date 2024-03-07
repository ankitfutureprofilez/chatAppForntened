import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Singup from './components/Singup';
import Login from './components/Login';
import UserContextProvider from "./context/UserContextProvider";
import Reciver from './message/Reciver';
import PrivateRoute from './Router/PrivateRoute';
import OpenAi from './openai/OpenAi';
import { useEffect, useState } from 'react';
import Multer from './openai/Multer';
import Regex from './components/Regex';
import Employees from './components/Employees';
import Productadd from './product/Productadd';
import ProductList from './product/ProductList';
import ProductUpdate from './product/ProductUpdate';
import Userproductshow from './Userproduct/Userproductshow';
import Userproduct from './Userproduct/Userproduct';
import { io } from 'socket.io-client';
import Cart from './product/Cart';


// const socket =io("https://chat-appbackend.vercel.app");


function App() {

  useEffect(() => {
    const socket = io("http://localhost:8080/");
    // Socket.io events can be handled here
    // For example: socket.on('event', (data) => { /* handle the event */ });

    return () => {
      socket.disconnect(); // Clean up the socket connection on component unmount
    };
  }, []);
  const URL = process.env.REACT_APP_BASE_URL
  console.log("REACT_APP_BASE_URL ffff", URL)
  const [cart, setCart] = useState('')
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <div>
      <UserContextProvider value={{ cart, setCart }}>
        <Router>
          <Routes>
            <Route path='/product' element={<Productadd />}></Route>
            <Route path='/Productlist' element={<ProductList />}></Route>
            <Route path="/productupdate" element={<ProductUpdate />}></Route>
            <Route path='/products' element={<Userproduct />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/productshow' element={<Userproductshow />}></Route>
            <Route path='/employee' element={<Employees></Employees>}></Route>
            <Route path="/aaa" element={<Regex />}></Route>
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/' element={<Login />}></Route>
            <Route path="/multer" element={<Multer />}></Route>
            <Route path="/ai" element={<OpenAi />}></Route>
            {/* <Route path="/msg" element={<Msgdata />}></Route> */}
            <Route path="/join" element={<PrivateRoute><Reciver /></PrivateRoute>}></Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

