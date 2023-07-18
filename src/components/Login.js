import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Context } from './Context';
import Singup from '../Api/Signup';
import io from "socket.io-client";


function Login() {

    const socket=io.connect("http://localhost:5000")

    socket.on("Data",(data)=>{console.log(data)})
    socket.on("chat",(data)=>{console.log(data)})
  
    socket.on("tem",(data)=>{console.log(data)})
  socket.emit("reat","aaaaaaa")
    const { setLoginname, setLoginuserId } = useContext(Context)

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
        e.preventDefault(); // Prevent form submission

        const main = new Singup();
        try {
            const res = await main.Loginshow(Regs);
            console.log(res.data.user);


            setRegs(res.data.user);
            if (res.data.user) {

                //  console.log(d)
                const f = (res && res.data.user.userId)
                console.log(f)
                localStorage.setItem('loginuserid', f)
                const users = localStorage.getItem('loginuserid')
                console.log(users)
                setLoginuserId(users);


                const d = (res && res.data.user.username)
                localStorage.setItem('loginname', d)
                const logins = localStorage.getItem('loginname')
                // console.log(logins)
                setLoginname(logins);

                localStorage.setItem("token", res.data.token);

                navigate('/chat');

            }



            // Navigating to the chat page
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <section id="login">
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <MDBContainer fluid >
                            <MDBRow>
                                <MDBCol sm='8' className='mt-5 mb-6'>


                                    <div class="px-5 ms-xl-4">
                                        <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: "#709085" }}></i>
                                        <span class="h1 fw-bold mb-0">Logo</span>
                                    </div>
                                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                                        <h3 className="fw-normal text-center mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Login</h3>
                                        <MDBInput wrapperClass='mb-4 mx-5 w-100'
                                            name="username"
                                            onChange={handleInputs}
                                            value={Regs.username}
                                            label='Email address' id='formControlLg' type='text' size="lg" />
                                        <MDBInput wrapperClass='mb-4 mx-5 w-100'
                                            name="password"
                                            onChange={handleInputs}
                                            value={Regs.password}
                                            label='Password' id='formControlLg' type='password' size="lg" />
                                        <MDBBtn className="mb-4 px-5 mx-5 w-100"
                                            onClick={handleForms}
                                            color='info' size='lg'>Login</MDBBtn>
                                        <p className='ms-5'>Don't have an account? <a href="/reg" class="link-info">Register here</a></p>
                                    </div>
                                </MDBCol>
                                <MDBCol sm='4' className='mt-5 mb-6'>
                                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                                        <div className="text-Black px-3 py-4 p-md-5 mx-md-4">
                                            <h4 class="">We are more than just a company</h4>
                                            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>

                                    </div>
                                </MDBCol>

                            </MDBRow>
                        </MDBContainer>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Login;