import { useEffect, useState } from "react";
import Product from "../Api/Product";
import Userproductshow from "./Userproductshow";
import Header from "../components/Header";

function Userproduct() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const main = new Product();
        main.productgetuser()
            .then((res) => {
                console.log("res", res.data.data);
                setList(res.data.data);
            })
            .catch((error) => {
                // Handle error if needed
            });
    }, []);

    return (
        <>
            <section id ="product">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
<Header/>
                        </div>
                        <div className="col-md-3">
                            <>
                                <h2>Products </h2>
                                <section id="productstr">
                                    
                                    {list.map((result) => (
                                        <Userproductshow key={result._id} products={result} />
                                        //  <Productstr key={result._id} product={result}/>
                                    ))}
                                </section>
                            </>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Userproduct;