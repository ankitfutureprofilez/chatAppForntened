import { createContext, useState} from "react";
export const UserContext = createContext();

export default function UserContextProvider(props) {
    const [socketIO, setSocketIO] = useState(null);
    const [name, setName] = useState('WhoUInto');
    const [loginUser, setLoginUser] = useState();
  

    let values = { name, setName, socketIO, setSocketIO, loginUser, setLoginUser };

    return <>
        <UserContext.Provider value={values} >
            {props.children}
        </UserContext.Provider>
    </>
}