import { useState } from "react";
import { useEffect } from "react";
import Product from "../Api/Product";
import ProductUpdate from "./ProductUpdate";

function ProductList() {
  const [list, setList] = useState([]);
  const [listUpdate, setListUpdate] = useState();

  useEffect(() => {
    const main = new Product();
    main
      .productlist()
      .then((res) => {
        console.log("res", res.data.data);
        //   console.log(userId)
        ///  setUserId(res.data.userId);
        setList(res.data.data);
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, [listUpdate]);

  async function deleteproduct(e) {
    const main = new Product();
    const response = main.productdelete(e);
    response
      .then((res) => {
        console.log(res);
        setListUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  const [isUnpublish, setIsUnpublish] = useState("unpublish"); // Assuming initial status is "unpublish"

  //setIsUnpublish((prevState) => !prevState);
  // const handleClick = async (id) => {
  //     const main = new Product();
  //     console.log("main",main);
  //     const response = main.productstatus(id);
  //     console.log("response",response)
  //     response.then((res) => {
  //         console.log(res);
  //       setIsUnpublish(res)
  //     }).catch((err) => {
  //         console.log(err);
  //     });
  // };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title_container mb-3 mt-2 text-center">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="chat-logo.png" alt="Logo" height="60px" />
                  <p className="title mr-2">Product's List</p>
                </div>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((res, key) => (
                      <tr key={res._id}>
                        <td>{key + 1}</td>
                        <td>
                          <img src={res.img} alt="aaa" />
                        </td>
                        <td>{res.title}</td>
                        <td>{res.description}</td>
                        <td>{res.price}</td>
                        <td>{res.discount}</td>
                        <th>{res.role}</th>
                        <td>{res.status}</td>
                        {/* <td onClick={() => { handleClick(res._id) }}> {isUnpublish ? 'unpublish' : 'publish'} </td> */}
                        <td>
                          <ProductUpdate id={res._id} data={res} />
                        </td>
                        <td onClick={() => deleteproduct(res._id)}>
                          <i class="bi bi-trash-fill"></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductList;
