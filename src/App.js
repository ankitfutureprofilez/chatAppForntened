import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Singup from './components/Singup';
import Login from './components/Login';
import UserContextProvider from "./context/UserContextProvider";
import Reciver from './message/Reciver';
import Msgdata from './message/Msgdata';
import PrivateRoute from './Router/PrivateRoute';
import OpenAi from './openai/OpenAi';
import Header from './components/Header';




function App() {
  console.log("REACT_APP_BASE_URL ffff",process.env.REACT_APP_BASE_URL)

  return (
    <div>
      <UserContextProvider>
        <Router>
       
          <Routes>
            <Route path='/reg' element={<Singup/>}> </Route>
            <Route path='/' element={<Login/>}></Route>
            <Route path="/OpenApi" element={<PrivateRoute><OpenAi/></PrivateRoute>}></Route>
            <Route path="/msg" element={<Msgdata/>}></Route>
            <Route path="/join" element={<PrivateRoute><Reciver/></PrivateRoute>}></Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>

  );
}

export default App;

