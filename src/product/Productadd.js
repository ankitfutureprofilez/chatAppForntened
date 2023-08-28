import { useState } from "react";
import Product from "../Api/Product";

function Productadd() {

    const [products, setProducts] = useState({
        title: "",
        price: "",
        discount: '',
        status: "",
        description: "",
        img: ""

    })

    const handleInputs = (e) => {
        let valueattr = e.target.value;
        let nameattr = e.target.name;
        setProducts({ ...products, [nameattr]: valueattr });
        console.table(products);
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setProducts({ ...products, img: file });
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const main = new Product();
        console.log("main", main);
        const response = main.productadd(products);
        response.then((res) => {
            console.log(res);
        }).catch((err) => {
            const error = err.errors;
            console.log(error);
        });
    };

    return (
        <>
            <section id="product">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <div className="title_container">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="chat-logo.png" alt="Logo" height="60px" />
                                    <p className="title mr-2">Product's Add</p>
                                </div>
                            </div>
                            <div className="form-container mt-2">
                                <div className="input_container mt-2" >
                                    <label className="input_label">Img</label>
                                    <input type="text" placeholder="img"
                                        name="img"
                                        defaultValue={Product.img}
                                        onChange={handleInputs}
                                        className="form-control" />
                                </div>
                                <div className="input_container mt-2">
                                    <label className="input_label">Product Name</label>
                                    <input type="text" placeholder="Product Add"
                                        name="title"
                                        defaultValue={Product.title}
                                        onChange={handleInputs}
                                        className="form-control" />
                                </div>
                                <div className="input_container mt-2">
                                    <label className="input_label">Description</label>
                                    <input type="text" placeholder="Description"
                                        name="description"
                                        onChange={handleInputs}
                                        defaultValue={Product.description}
                                        className="form-control" />
                                </div>
                                <div className="input_container mt-2">
                                    <label className=" input_label">Discount</label>
                                    <input type="text" placeholder="Discount"
                                        onChange={handleInputs}
                                        name="discount"
                                        defaultValue={Product.discount}
                                        className="form-control" />
                                </div>

                                <div className="input_container mt-2">
                                    <label className=" input_label">Price</label>
                                    <input type="text" placeholder="Price"
                                        onChange={handleInputs}
                                        name="price"
                                        defaultValue={Product.price}
                                        className="form-control" />
                                </div>
                                <div className="input_container mt-2">
                                    <label className="input_label">Status</label>
                                    <select
                                        title="Input title" className="form-control"
                                        name="status"
                                        defaultValue={Product.status}
                                        onChange={handleInputs}
                                    >
                                        <option value='..on Choose'>..on choose</option>
                                        <option value="Publish">Publish</option>
                                        <option value="Un-publish">Un-publish</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="submit"
                                        onClick={handleFormSubmit} className='btn btn-success mt-3 mb-2 form-control'>submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Productadd;