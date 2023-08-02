import { useContext, useEffect } from 'react';

import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import Singup from '../Api/Signup';

export default function PrivateRoute(props) {

  const { setLoginUser} = useContext(UserContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const main = new Singup();
    const resp = main.user();
    resp.then((res) => {
      console.log("user", res);
      if (res.data) {
        setLoginUser(res.data.user);
      } else {
        <Navigate to="/login" />
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [setLoginUser]);

  return <>
    {props.children}
  </>

}
