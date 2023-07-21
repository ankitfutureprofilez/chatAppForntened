import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContextProvider';


function Header() {

    const { loginUser, setLoginUser } = useContext(UserContext)
    const Navigate = useNavigate()
    function handlelogout(e) {
        localStorage.removeItem('loginUser')
        setLoginUser(localStorage.getItem('loginUser'))
        Navigate('/login')
    }
    const wrapFirstLetterInDiv = (loginUser) => {
        const firstLetter = loginUser.charAt(0).toUpperCase();
        return (
            <div style={{ display: "inline-block", borderRadius: "50%", width: "30px", height: "30px", textAlign: "center", lineHeight: "25px", background: "gray", color: "white", fontWeight: "bold" }}>
                {firstLetter}
            </div>
        );
    };


    return (
        <section id="header">
        <div>
          <div className="mt-2 mb-3">
            {loginUser ? (
              <>
                <Link className="text-dark font-bold mt-2 mb-2" to="/Join">
                  <button>Join Msg.</button>
                </Link>
              </>
            ) : (
              <>
                <Link className="text-dark font-bold mt-2 mb-2" to="/login">
                  <button>Login</button>
                </Link>
                <Link className="text-dark font-bold  mt-2 mb-2" to="/reg">
                  <button>Registration</button>
                </Link>
              </>
            )}
          </div>
          {loginUser ? (
            <div className="rightactions">
              <strong className="d-inline-block text-capitalize">
                <button>
                  <div className="user-avatar">{wrapFirstLetterInDiv(loginUser)}</div>
                  {loginUser}
                </button>
              </strong>
            </div>
          ) : (
            <></>
          )}
  
  {loginUser ? (
          <div className="logout-action">
            <button
              onClick={(e) => {
                handlelogout(e);
              }}
              className="btn btn-danger mt-2 mb-3"
            >
                <i class="bi bi-power"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
        </div>
      </section>
    );
}

export default Header;