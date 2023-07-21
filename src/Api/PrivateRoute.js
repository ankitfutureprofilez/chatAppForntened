import { useContext } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element, ...rest }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('loginuser') && localStorage.getItem('token'));

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Element />} />;
}
