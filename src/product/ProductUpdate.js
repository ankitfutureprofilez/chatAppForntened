import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Product from "../Api/Product";
import { useNavigate } from 'react-router-dom';



function ProductUpdate(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data } = props;
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        title: data.title,
        description: data.description,
        price: data.price,
        discount: data.discount,
        status: data.status,
        img: data.img,
    });

    async function patch(e) {
        e.preventDefault()
        const main = new Product(); // Create an instance of your Product class
            const fdata = new FormData();
            fdata.append("name", productData.title);
            fdata.append("desc", productData.description);
            fdata.append("discount", productData.discount);
            fdata.append("price", productData.price);
            fdata.append("status", productData.status);
            fdata.append("img", productData.img);
            console.log("formData", fdata)
            console.log("main", main)
            console.log("data._id",data._id)
            console.log("fdata",fdata)
            const response = await main.productupdate(data._id, fdata);
            console.log("Response:", response);
            response.then((res) => {
                console.log("res",res);
                navigate('/productlist')
            }).catch((err) => {
               
                console.log("error,err",err);
            });
    
}

    const handleInputs = (e) => {
        let valueattr = e.target.value;
        let nameattr = e.target.name;
        setProductData({ ...productData, [nameattr]: valueattr });
        console.table(productData);
    }; 
    return (
        <section id="update">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <>
                            <Button variant="primary" onClick={handleShow}>
                                Update
                            </Button>

                            <Modal show={show} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Product Update</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label className='mt-2 mb-2 ' >Product Img</label>
                                    <Form.Control
                                        type='text'
                                        onChange={handleInputs}
                                        defaultValue={productData.img}
                                        name='img'
                                        enctype="multipart/form-data"
                                        placeholder="Product Img" />
                                    <label className='mt-2 mb-2 ' >Product Name</label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleInputs}
                                        defaultValue={productData.title}
                                        name='title'
                                        placeholder="Product Name"
                                    />
                                    <label className='mt-2 mb-2 '>Product Desc</label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleInputs}
                                        defaultValue={productData.description}
                                        name='description'
                                        placeholder="Product Desc" />

                                    <label className='mt-2 mb-2 '>Product Price</label>
                                    <Form.Control
                                        type="number"
                                        onChange={handleInputs}
                                        defaultValue={productData.price}
                                        name='price'
                                        placeholder="Product Price" />
                                    <label className='mt-2 mb-2 '>Product discount</label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleInputs}

                                        defaultValue={productData.discount}
                                        name='discount'
                                        placeholder="Product discount" />


                                    <label className="input_label">Status</label>
                                    <select
                                        title="Input title" className="form-control"
                                        name="status"
                                        defaultValue={productData.status}
                                        onChange={handleInputs}
                                    >
                                        <option value='..on Choose'>..on choose</option>
                                        <option value="Publish">Publish</option>
                                        <option value="Un-publish">Un-publish</option>
                                    </select>
                                    <button className='btn btn-success mt-2  form-control' onClick={patch} >Submit</button>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductUpdate;