import  { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
   const navigate = useNavigate();
    useEffect(()=>{ 
      const token = localStorage.getItem("token");
      if(!token){   
          navigate('/login')
      }
    },[]);
  return children 
}
