import { useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContextProvider';
import { Toaster } from 'react-hot-toast';


function Header() {

    const { loginUser, setLoginUser, cart } = useContext(UserContext)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    console.log("addcart", cart)
    const Navigate = useNavigate()
    function handlelogout(e) {
        localStorage.removeItem('loginUser')
        setLoginUser(localStorage.getItem('loginUser'))
        Navigate('/')
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
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/Join">
                                    <i className="bi bi-chat"></i>
                                </Link></li>
                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/multer">
                                    <i class="bi bi-file-text"></i>
                                </Link></li>

                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/ai">

                                    <i class="bi bi-filetype-ai"></i>
                                </Link></li>

                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/employee">
                                    <i class="bi bi-person-add"></i>
                                </Link></li>
                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/product">
                                    <i class="bi bi-cart-plus"></i>
                                </Link></li>
                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/productlist">
                                    <i class="bi bi-cart-check"></i>
                                </Link></li>
                            </>
                            <>
                                <li><Link className="text-dark font-bold mt-2 mb-2" to="/products">
                                <i class="bi bi-bag-check-fill"></i>
                                </Link></li>
                            </>
                            <>
                               
                                    <Link to='/cart'> <i className="bi bi-cart4 me-2" style={{ color: 'white', fontSize: '25px' }}>{cart.totalitems ? cart.totalitems : 0}</i></Link>
                               
                            </>
                        </>
                    ) : (
                        <>
                            <li><Link className="text-dark font-bold mt-2 mb-2" to="/">
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