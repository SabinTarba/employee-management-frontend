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


    const handleProductForm = (e) => {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const saveProduct = (e) => {
        e.preventDefault();

        ProductService.createProduct(newProduct).then((res) => {
            if (res.status === 200) {
                navigate(0);
            }
        })
    }

    return (
        <div className="mt-3">
            <h3 className="text-light">Add a product</h3>

            <form onSubmit={saveProduct}>
                <div className="row">
                    <div className="col-lg-4">
                        <label>Description</label>
                        <input name="description" type="text" className="form-control" placeholder="Description" onChange={handleProductForm} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Quantity</label>
                        <input name="quantity" type="number" min="0" className="form-control" placeholder="Quantity" onChange={handleProductForm} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Price</label>
                        <input name="price" type="number" min="0" step="0.01" className="form-control" placeholder="Price" onChange={handleProductForm} required />
                    </div>
                    <div className="col-lg-2">
                        <label>Available</label>
                        <select name="active" className="form-control" onChange={handleProductForm} required>
                            <option key={0} value={false}>No</option>
                            <option key={1} value={true}>Yes</option>
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