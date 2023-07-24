import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Singup from './components/Singup';
import Login from './components/Login';
import PrivateRoute from './Api/PrivateRoute';
import UserContextProvider from "./context/UserContextProvider";
import Reciver from './message/Reciver';
import Msgdata from './message/Msgdata';

function App() {
  return (
    <div>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/reg' element={<Singup />}> </Route>
            <Route path='/' element={<Login />}></Route>
            <Route path="/msg" element={<Msgdata />}></Route>
            <Route path="/join" element={<PrivateRoute><Reciver /></PrivateRoute>}></Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

