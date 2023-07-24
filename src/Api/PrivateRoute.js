import { useContext, useEffect } from 'react';
import Singup from './Signup';
import { useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

export default function PrivateRoute(props) {

  const { setLoginUser, auth, setAuth } = useContext(UserContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const main = new Singup();
    const resp = main.user();
    resp.then((res) => {
      console.log("user", res);
      if (res.data.status) {
        setAuth(res.data.status);
        setLoginUser(res.data.user);
      } else {
        <Navigate to="/login" />
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return <>
    {props.children}
  </>

}
