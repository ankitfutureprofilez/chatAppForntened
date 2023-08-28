import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

function Userproductshow(props) {
    console.log("props", props)

    const{products} = props;
    //const{cart,setCart} = useContext(LoginContext)
  
    const{cart,setCart}=   useContext(UserContext);

    function handlecart(e,product){
        console.log(product)
        let _cart = {...cart}
        if(!_cart.items){
            _cart.items = {}
        }
        if(!_cart.items[product._id]){
            _cart.items[product._id] = 1
        }else{
            _cart.items[product._id] += 1
        }
        if(!_cart.totalitems){
            _cart.totalitems = 1
        }else{
            _cart.totalitems += 1
        }

        setCart(_cart)
        console.log(cart)
    }
   
    return (
        <>
        <section id ="str">
            <div className="container m-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" style={{ width: "18rem" }}>
                            <img  src ={products.img} style={{ width: '300px' }} className="card-img-top" alt="..."  />
                            <div className="card-body">
                                <h5 className="card-title">{products.title}</h5>
                                <p className="card-text">{products.price}</p>
                                <p className="card-text">{products.discount}</p>
                                <p className="card-text">{products.description}</p>
                                <button className="btn btn-danger me-2"  onClick={(e)=>{handlecart(e,products)}}>Add Cart</button>
                            </div>





                        </div>

                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Userproductshow;