import { createContext, useEffect, useState} from "react";
export const UserContext = createContext();

export default function UserContextProvider(props) {
    const [socketIO, setSocketIO] = useState(null);
    const [name, setName] = useState('WhoUInto');
    const [loginUser, setLoginUser] = useState();
  const [auth,setauth]=useState();
  const[cart,setCart] = useState('');
  useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

    let values = { auth,setauth,name, setName, socketIO, setSocketIO, loginUser, setLoginUser ,cart,setCart};


    return <>
        <UserContext.Provider value={values} >
            {props.children}
        </UserContext.Provider>
    </>
}