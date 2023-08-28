import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

function Cart() {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart.items) {
            return;
        }
        fetch('/api/cart', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                setProducts(data);
            });
    }, [cart]);

    const handlequantity = (id) => {
        let quantity = cart.items[id] || 0;
        return quantity;
    };

    const totalAmount = products.reduce((total, product) => {
        return total + handlequantity(product._id) * product.price;
    }, 0);




    function handleincrement(e, id) {
        let current_qnty = handlequantity(id)
        let _cart = { ...cart }
        if (current_qnty < 10) {

            _cart.items[id] = current_qnty + 1
            _cart.totalitems += 1
            setCart(_cart)

        }
    }

    function handledecrement(e, id) {
        let current_qnty = handlequantity(id)
        let _cart = { ...cart }
        if (current_qnty > 1) {

            _cart.items[id] = current_qnty - 1
            _cart.totalitems -= 1
            setCart(_cart)

        }

    }

    function handledelete(e, id) {
        let current_qnty = handlequantity(id)
        let _cart = { ...cart }
        delete _cart.items[id]
        _cart.totalitems -= current_qnty
        setCart(_cart)

    }
    function handlecheckout(e) {
        ///fecth() paybal

        //fecht Daatabase 
        //frech(insert the database)
        window.localStorage.setItem('cart', '')
        setCart(window.localStorage.getItem('cart'))
        navigate('/products')
    }

    return (
        <section>
            <Link to='/products'><button className="btn btn-warning" style={{ width: '100px' }}>Back</button></Link>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {products.length ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>
                                        <th>Product Quantity</th>
                                        <th>Product Price</th>
                                        <th>Product Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((result, key) => (
                                        <tr key={result._id}>
                                            <td>{key + 1}</td>
                                            <td>{result.name}</td>
                                            <td>{result.desc}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={(e) => { handledecrement(e, result._id) }}>-</button>
                                                {handlequantity(result._id)}
                                                <button className="btn btn-success" onClick={(e) => { handleincrement(e, result._id) }}>+</button>
                                            </td>
                                            <td>{handlequantity(result._id) * result.price}</td>
                                            <td>
                                                <button className="btn btn-secondary" onClick={(e) => { handledelete(e, result._id) }}>
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="6">Total Amount: {totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <button className="form-control btn btn-outline-info" onClick={(e) => { handlecheckout(e) }}>CheckOut</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <h2><img src="empty.png" alt="" /></h2>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;
