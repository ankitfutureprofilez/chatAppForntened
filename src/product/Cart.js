import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

function Cart() {
  const [Products, setProducts] = useState([]);
  const { cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();
  let totalamount = 0;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //     if (!cart.items) {
  //         return;
  //     }
  //     async function fetchData() {
  //         try {
  //             const main =  new Product();
  //             console.log("main",main);
  //             const response = await main.cartadd({ ids: Object.keys(cart.items) }); // Use your cartadd function from Api
  //             console.log("response", response);
  //             setProducts(response);
  //         } catch (error) {
  //             console.error("Error:", error);
  //         }
  //     }

  // }, []);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    axios
      .post("http://localhost:8080/api/carts", { ids: Object.keys(cart.items) })
      .then((res) => res.data) // Access the response data directly
      .then((response) => {
        console.log("data", response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [cart]);

  console.log("cart", cart);
  console.log("Products", Products);

  function handlequantity(id) {
    let quantity = cart.items[id];
    return quantity;
  }

  function handleprice(id, price) {
    let tprice = handlequantity(id) * price;
    totalamount = totalamount + tprice;
    return tprice;
  }

  function handleincrement(e, id) {
    let current_qnty = handlequantity(id);
    let _cart = { ...cart };
    if (current_qnty < 10) {
      _cart.items[id] = current_qnty + 1;
      _cart.totalitems += 1;
      setCart(_cart);
    }
  }

  function handledecrement(e, id) {
    let current_qnty = handlequantity(id);
    let _cart = { ...cart };
    if (current_qnty > 1) {
      _cart.items[id] = current_qnty - 1;
      _cart.totalitems -= 1;
      setCart(_cart);
    }
  }

  function handledelete(e, id) {
    let current_qnty = handlequantity(id);
    let _cart = { ...cart };
    delete _cart.items[id];
    _cart.totalitems -= current_qnty;
    setCart(_cart);
  }
  function handlecheckout(e) {
    ///fecth() paybal

    //fecht Daatabase
    //frech(insert the database)
    window.localStorage.setItem("cart", "");
    setCart(window.localStorage.getItem("cart"));
    navigate("/products");
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="title_container mb-3 mt-2 text-center">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="chat-logo.png" alt="Logo" height="60px" />
                <p className="title mr-2">Add To Cart </p>
              </div>
            </div>
            {Products.length ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Product Title</th>
                    <th>Product Img</th>
                    <th>Product Quanity</th>
                    <th>Product Price</th>
                    <th>Product Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Products.map((result, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{result.title}</td>
                      <td>
                        {" "}
                        <img
                          src={result.img}
                          alt="aaa"
                          style={{ width: "100px" }}
                        />{" "}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            handledecrement(e, result._id);
                          }}
                        >
                          -
                        </button>
                        {handlequantity(result._id)}
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            handleincrement(e, result._id);
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td>{handleprice(result._id, result.price)}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            handledelete(e, result._id);
                          }}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="6">Total Amount: {totalamount}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <button
                        className="form-control btn btn-outline-info mt-2"
                        onClick={(e) => {
                          handlecheckout(e);
                        }}
                      >
                        CheckOut
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <h2>
                <img src="empty.png" alt="" />
              </h2>
            )}
          </div>
        </div>
      </div>

      <Link to="/products">
        <button className="btn btn-warning" style={{ width: "100px" }}>
          Back
        </button>
      </Link>
    </section>
  );
}

export default Cart;
