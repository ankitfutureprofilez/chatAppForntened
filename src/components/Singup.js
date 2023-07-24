import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import Singup from '../Api/Signup';
function Sing() {
    const navigate = useNavigate()

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
        const resp = main.Regshow(Regs)
        resp.then((res) => {
            console.log(res.data.user)
            navigate('/login')
        }).then((err) => {
            console.log(err)
        })
    };

    return (
        <section id="reg">
            <div className='container'>
                <div className="row">
                    <div className='col-md-12'>
                        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='mb-5' style={{ maxWidth: '600px' }}>
                                <MDBCardBody className='px-5'>
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <MDBInput wrapperClass='mb-4'
                                        defaultValue={Regs.username}
                                        onChange={handleInputs}
                                        name="username"
                                        label='Your User Name' size='sm' id='form1' type='text' />
                                    <MDBInput wrapperClass='mb-4'
                                        defaultValue={Regs.name}
                                        onChange={handleInputs}
                                        name="name"
                                        label='Your Name' size='lg' id='form1' type='text' />
                                    <MDBInput wrapperClass='mb-4'
                                        defaultValue={Regs.email}
                                        onChange={handleInputs}
                                        name="email"
                                        label='Your Email' size='lg' id='form2' type='email' />
                                    <MDBInput wrapperClass='mb-4'
                                        defaultValue={Regs.password}
                                        onChange={handleInputs}
                                        name="password"
                                        label='Password' size='lg' id='form3' type='password' />
                                    <MDBInput wrapperClass='mb-4'
                                        defaultValue={Regs.confirmPassword}
                                        onChange={handleInputs}
                                        name="confirmpassword"
                                        label='Repeat your password' size='lg' id='form4' type='password' />
                                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'
                                        onClick={handleFormSubmit}
                                    >Register</MDBBtn>
                                    <Link to='/login'>Have already an account? Login here</Link>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </div>

                </div>
            </div>
        </section>

    );
}

export default Sing;