import { createContext, useState} from "react";
export const UserContext = createContext();

export default function UserContextProvider(props) {
    const [socketIO, setSocketIO] = useState(null);
    const [name, setName] = useState('WhoUInto');
    const [loginUser, setLoginUser] = useState();
    const [auth, setAuth] = useState();

    let values = { auth, setAuth, name, setName, socketIO, setSocketIO, loginUser, setLoginUser };

    return <>
        <UserContext.Provider value={values} >
            {props.children}
        </UserContext.Provider>
    </>
}