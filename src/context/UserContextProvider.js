import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(); 

export default function UserContextProvider(props) {
    const [socketIO, setSocketIO] = useState(null);
    const [name, setName] = useState('WhoUInto');
    const [loginUser,setLoginUser] = useState();
    const [loginuserid,setLoginUserId] = useState();

    let values = {loginuserid,setLoginUserId, name, setName, socketIO, setSocketIO, loginUser,setLoginUser};
    return <>
        <UserContext.Provider value={values} >
            {props.children}
        </UserContext.Provider>
    </>
}