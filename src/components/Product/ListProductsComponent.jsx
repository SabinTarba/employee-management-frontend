import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import ProductService from "../../services/ProductService";
import ModalComponent from "../ModalComponent";
import CreateProductComponent from "./CreateProductComponent";


function ListProductsComponent() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);


    const getProducts = () => {

        ProductService.getProducts().then((res) => {
            setProducts(res.data);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id).then((res) => {

            if (res.status === 200) {
                navigate(0);
            }
        })
    }

    const toggleActive = (id, option) => {
        ProductService.toggleActive(id, option).then((res) => {
            if (res.status === 200) {
                navigate(0);
            }
        })
    }




    return (
        <div className="container">

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="bootstrap-data-table-panel">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#Product id</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Available</th>
                                            <th scope="col"><span className="ml-5">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product) => {
                                                return (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.description}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}</td>
                                                        <td><span className="ml-3">
                                                            {
                                                                product.active
                                                                    ?
                                                                    (<><span className="mr-2">Yes</span><i className="fa-solid fa-check text-success"></i></>)
                                                                    :
                                                                    (<><span className="mr-2">No</span><i className="fa-solid fa-x text-danger"></i></>)
                                                            }
                                                        </span>
                                                        </td>
                                                        <td>
                                                            <div className="container d-flex">
                                                                <button className="btn btn-danger mr-2 " onClick={() => deleteProduct(product.id)}>Delete</button>
                                                                {
                                                                    !product.active
                                                                        ?
                                                                        <button className="btn btn-success" onClick={() => {

                                                                            if (window.confirm("Are you sure you want to change the availability of this product?")) { toggleActive(product.id, true) }

                                                                        }}>Set available</button>

                                                                        :

                                                                        <button className="btn btn-warning text-white" onClick={() => {

                                                                            if (window.confirm("Are you sure you want to change the availability of this product?")) { toggleActive(product.id, false) }
                                                                        }}

                                                                        >Set unavailable</button>



                                                                }
                                                                <ModalComponent currentQuantity={product.quantity} description={product.description} productId={product.id}/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            </div>


            <CreateProductComponent />

        </div>

    )
}

export default ListProductsComponent