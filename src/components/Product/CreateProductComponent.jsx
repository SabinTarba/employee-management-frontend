import { useState } from 'react';
import { useNavigate } from 'react-router';
import ProductService from '../../services/ProductService';

function CreateProductComponent() {

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        "description": "",
        "quantity": "",
        "price": "",
        "active": false
    });

    const handleDescriptionInput = (e) => {
        e.preventDefault();

        let updatedValue = { description: e.target.value };
        setNewProduct(newProduct => ({
            ...newProduct,
            ...updatedValue
        }));

    }

    const handleQuantityInput = (e) => {
        e.preventDefault();

        let updatedValue = { quantity: e.target.value };
        setNewProduct(newProduct => ({
            ...newProduct,
            ...updatedValue
        }));

    }

    const handlePriceInput = (e) => {
        e.preventDefault();

        let updatedValue = { price: e.target.value };
        setNewProduct(newProduct => ({
            ...newProduct,
            ...updatedValue
        }));

    }

    const handleAvailabilityInput = (e) => {
        e.preventDefault();

        let updatedValue = { active: e.target.value === "yes" ? true : false };
        setNewProduct(newProduct => ({
            ...newProduct,
            ...updatedValue
        }));

    }

    const saveProduct = (e) => {
        e.preventDefault();

        ProductService.createProduct(newProduct).then((res) => {
            if (res.status === 200) {
                navigate(0);
            }
        })

        console.log(newProduct);

    }


    return (
        <div className="mt-3">
            <h3>Add a product</h3>

            <form onSubmit={saveProduct}>
                <div className="row">
                    <div className="col-lg-4">
                        <label>Description</label>
                        <input type="text" className="form-control" placeholder="Description" onChange={handleDescriptionInput} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Quantity</label>
                        <input type="number" min="0" className="form-control" placeholder="Quantity" onChange={handleQuantityInput} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Price</label>
                        <input type="number" min="0" step="0.01" className="form-control" placeholder="Price" onChange={handlePriceInput} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Available</label>
                        <select className="form-control" onChange={handleAvailabilityInput} required>
                            <option key={0} value={"no"}>No</option>
                            <option key={1} value={"yes"}>Yes</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-primary w-50 mb-3" style={{ marginTop: "30px" }}>Add</button>
                    </div>
                </div>
            </form >


        </div >

    )
}

export default CreateProductComponent