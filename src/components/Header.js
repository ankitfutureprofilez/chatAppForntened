import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContextProvider';
import { Toaster } from 'react-hot-toast';


function Header() {

    const { loginUser, setLoginUser } = useContext(UserContext)
    const Navigate = useNavigate()
    function handlelogout(e) {
        localStorage.removeItem('loginUser')
        setLoginUser(localStorage.getItem('loginUser'))
        Navigate('/login')
    }
    const wrapFirstLetterInDiv = (loginUser) => {
        if (loginUser && typeof loginUser === 'object' && loginUser.username) {
            const firstLetter = loginUser.username.charAt(0).toUpperCase();
            return (
                <div style={{ display: "inline-block", borderRadius: "50%", width: "30px", height: "30px", textAlign: "center", lineHeight: "25px", background: "gray", color: "white", fontWeight: "bold" }}>
                    {firstLetter}
                </div>
            );
        } else {
            return null;
        }
    };
    return (
        <section id="header">
            <div className="rightactions">
                <div className='logo'>
                    <Link to="/join">
                        <img src="chat-logo.png" height="60px" alt="Logo" className="logo-img" />
                    </Link></div>
            </div>
            <div className='middle-menu'>
                <ul>
                    {loginUser ? (
                        <>
                            <li><Link className="text-dark font-bold mt-2 mb-2" to="/Join">
                                <i className="bi bi-chat"></i>
                            </Link></li>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/ai">
                                    <i class="bi bi-filetype-ai"></i>
                                </Link></li>
                            </>

                        </>
                    ) : (
                        <>
                            <li><Link className="text-dark font-bold mt-2 mb-2" to="/login">
                                Login
                            </Link></li>
                            <li><Link className="text-dark font-bold  mt-2 mb-2" to="/reg">
                                Registration
                            </Link></li>
                        </>
                    )}
                </ul>
            </div>
            {loginUser ? (
                <div className="logout-action">
                    <div className="d-flex m-auto mb-2 text-capitalize">
                        <div>
                            <div className="user-avatar">{wrapFirstLetterInDiv(loginUser)}</div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            handlelogout(e);
                        }}
                        className="btn btn-danger"
                    >
                        <i className="bi bi-power"></i>
                    </button>
                </div>
            ) : (
                <></>
            )}
            
              <Toaster
              position="top-center"
              reverseOrder={false}
            />
        </section>
    );
}

export default Header;