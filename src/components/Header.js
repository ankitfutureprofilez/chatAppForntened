import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './Context';

function Header() {
    const { loginname, setLoginname } = useContext(Context)
    const Navigate = useNavigate()
    function handlelogout(e) {
        localStorage.removeItem('loginname')
        setLoginname(localStorage.getItem('loginname'))
        Navigate('/login')
    }
    return (
        <section id="header">
            <div className='container'>
                <div className='row'>
                    <header >



                        <Navbar bg="white" data-bs-theme="dark">
                            <Container>

                                <Navbar.Brand href="/login"><img src='logo192.png' width="50px" height="50px" className='me-2' /></Navbar.Brand>

                                <Nav className="me-auto mr-2 ml-2">




                                    <Link className='text-dark font-bold me-2' to="/login">
                                        <button>Login
                                        </button></Link>
                                    <Link className='text-dark font-bold  me-2' to="/reg">
                                        <button>
                                            Registration
                                        </button>
                                    </Link>

                                </Nav>

                                <div className='rightactions d-flex align-items-center' >
                                    <strong className='me-3 d-inline-block text-capitalize'><button>{loginname}</button></strong>
                                    <button onClick={(e) => { handlelogout(e) }}
                                        className='btn btn-danger' ><i class="bi bi-box-arrow-right  ">Logout</i></button>
                                </div>



                            </Container>
                        </Navbar>

                    </header>
                </div>
            </div>
        </section>
    );
}

export default Header;