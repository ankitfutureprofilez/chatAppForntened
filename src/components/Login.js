import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Singup from '../Api/Signup';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContextProvider';


function Login() {



    const { setLoginUser } = useContext(UserContext)

    const navigate = useNavigate();


    const [Regs, setRegs] = useState({
        password: "",
        username: "",
    });

    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
        console.table(Regs);
    };


    async function handleForms(e) {
        const main = new Singup();
        const resp = main.Loginshow(Regs);
        try {
            const res = await resp;
            console.log("res", res);
        //     if(res.data){
        //         if(res.data.status==="1"){

        //             console.log("logged in user", res.data);
        //            console.log(res.data.msg);
        //            toast.success(res.data.msg);
        //            navigate('/join');
        //            if (res.data.user) {
        //                setLoginUser(res.data.user);
        //                localStorage.setItem("token", res.data.token);
        //        }
        //         }
        //         else if(res.data ){

        //         }
        // }
        //     else{
        //         toast.error(res.data.msg);
        //     }
            if(res.data){
                if(res.data.user.role ===1 ){
                    console.log("logged in user", res.data);
                               console.log(res.data.msg);
                               toast.success(res.data.msg);
                               navigate('/join');
                               if (res.data.user) {
                                   setLoginUser(res.data.user);
                                   localStorage.setItem("token", res.data.token);
                }
            }
            else  if(res.data.user.role ===0 ){
                console.log("logged in user", res.data);
                           console.log(res.data.msg);
                           toast.success(res.data.msg);
                           navigate('/products');
                           if (res.data.user) {
                               setLoginUser(res.data.user);
                               localStorage.setItem("token", res.data.token);
            }
        }
    }
         } catch (err) {
            console.log("login err", err);
        }
    }
    


    return (
        <section id="login" className='d-flex items-center justify-content-center'>
            <div className='container m-auto'>
                <div className='row'>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <div className="form_container">
                            <div className="logo_container">

                                <img src="chat-logo.png" alt="Logo" height="60px" />
                            </div>
                            <div className="title_container">
                                <p className="title">Login to your Account</p>
                                <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
                            </div>
                            <br />
                            <div className="input_container">
                                <label className="input_label" for="email_field">Uername</label>
                               
                                <input placeholder="Username"
                                    name="username"
                                    onChange={handleInputs}
                                    value={Regs.username}

                                    title="Inpit title" type="text" className="input_field" id="email_field" />
                            </div>
                            <div className="input_container">
                                <label className="input_label" for="password_field">Password</label>
                               
                                <input placeholder="Password" title="Inpit title"
                                    name="password"
                                    onChange={handleInputs}
                                    value={Regs.password} type="password" className="input_field" id="password_field" />
                            </div>
                            <button title="Sign In"
                                onClick={handleForms}
                                className="sign-in_btn">
                                <span>Login</span>
                            </button>

                            <Link to='/reg'>
                                <button title="Sign In" type="submit"
                                    className="btn btn-success ">
                                    <span>SingUp</span>
                                </button>
                            </Link>
                        </div>

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>
        </section>


    );
}

export default Login;