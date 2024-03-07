import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { Link } from 'react-router-dom';
import Singup from '../Api/Signup';

function Sing() {
    const [Regs, SetRegs] = useState({
        name: '',
        password: '',
        email: '',
        username: '',
        confirmPassword: ''
    });

    const handleInputs = (e) => {
        let valueattr = e.target.value;
        let nameattr = e.target.name;
        SetRegs({ ...Regs, [nameattr]: valueattr });
        console.table(Regs);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const main = new Singup();
        const response = main.Regshow(Regs)
        response.then((res) => {
            if (res.data.status) {
                toast.success(res && res.data && res.data.msg);
            } else {
                toast.error(res && res.data && res.data.msg);
            }
            console.log(res);
        }).catch((err) => {
            const error = err.errors;
            console.log(error);

        });
    };

    return (

        <section id="login" className='d-flex items-center justify-content-center'>
            <div className='container m-auto'>
                <div className='row'>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">

                        <form className="form_container">
                            <div className="logo_container">

                                <img src="chat-logo.png" alt="Logo" height="60px" />
                            </div>
                            <div className="title_container">
                                <p className="title">SignUp  your Account</p>
                                <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
                            </div>
                            <br />
                            <div className="input_container">
                                <label className="input_label" for="email_field">Uername</label>
                            
                                <input placeholder="Username"
                                    defaultValue={Regs.username}
                                    onChange={handleInputs}
                                    name="username"

                                    title="Inpit title" type="text" className="input_field" id="email_field" />
                            </div>
                            <div className="input_container">
                                <label className="input_label" for="password_field">Name</label>
                               
                                <input placeholder="Name" title="Inpit title"
                                    defaultValue={Regs.name}
                                    onChange={handleInputs}
                                    name="name"
                                    type="text" className="input_field" id="password_field" />
                            </div>
                            <div className="input_container">
                                <label className="input_label" for="password_field">Email</label>
                               
                                <input placeholder="Email" title="Inpit title"
                                    defaultValue={Regs.email}
                                    onChange={handleInputs}
                                    name="email" type="email" className="input_field" id="password_field" />
                            </div>
                            <div className="input_container">
                                <label className="input_label" for="password_field">Password</label>
                           
                                <input placeholder="Password" title="Inpit title"
                                    defaultValue={Regs.password}
                                    onChange={handleInputs}
                                    name="password" type="password" className="input_field" id="password_field" />
                            </div>

                            <div className="input_container">
                                <label className="input_label" for="password_field">Confirm Password</label>
                              
                                <input placeholder="Password" title="Inpit title"
                                    defaultValue={Regs.confirmPassword}
                                    onChange={handleInputs}
                                    name="confirmPassword"
                                    type="password"
                                    className="input_field" id="password_field" />
                            </div>
                            <button title="Sign In" type="submit"
                                onClick={handleFormSubmit}
                                className="sign-in_btn">
                                <span>Sign Up</span>
                            </button>

                        </form>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                        <Link to="/">
                            <button title="Login" type=""
                                className="sign-in_btn">
                                <span>Login</span>
                            </button>
                        </Link>

                    </div>
                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        </section>


    );
}

export default Sing;