import OrderService from "../../services/OrderService";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from "../../services/EmployeeService";
import ProductService from "../../services/ProductService";
import OrdLnService from "../../services/OrdLnService";





function CreateOrderComponent() {

    const navigate = useNavigate();
    var date = new Date();

    const [employees, setEmployees] = useState([]);
    const [orderSources, setOrderSources] = useState([]);
    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState({
        dt: date,
        employeeId: "",
        status: "W",
        origin: ""

    });


    const getEmployees = () => {
        EmployeeService.getEmployees().then((data) => {
            setEmployees(data.data);
        })
    }

    const getOrderSources = () => {
        OrderService.getOrderSources().then((data) => {
            setOrderSources(data.data);
        })
    }

    const getProducts = () => {
        ProductService.getProducts().then((res) => {
            setProducts(res.data);
        })
    }



    useEffect(() => {
        getEmployees();
        getOrderSources();
        getProducts();
    }, [])


    const handleEmployeeFullName = (e) => {
        e.preventDefault();

        let updatedValue = { employeeId: e.target.value };
        setOrder(order => ({
            ...order,
            ...updatedValue
        }));

    }


    const handleOrderSource = (e) => {
        e.preventDefault();

        let updatedValue = { origin: e.target.value };
        setOrder(order => ({
            ...order,
            ...updatedValue
        }));
    }





    // HANDLING QUANTITIES INPUT

    let quantitiesProductIDsARRAY = [];

    const isProductIdInArray = (array, id) => {
        for (let i = 0; i < array.length; i++)
            if (array[i].productId === id)
                return true;

        return false;
    }

    const getIndexOfElement = (array, productId) => {
        for (let i = 0; i < array.length; i++)
            if (array[i].productId === productId)
                return i;

        return -1;
    }

    const handleQuantitiesInput = (e) => {
        e.preventDefault();


        const productId = e.target.getAttribute("data-key");
        const quantity = e.target.value;

        if (quantity === null || quantity === "" || quantity === undefined || quantity === "0") {

            if (isProductIdInArray(quantitiesProductIDsARRAY, productId)) {
                quantitiesProductIDsARRAY = quantitiesProductIDsARRAY.filter(e => e.productId !== productId)

            }

        }
        else {
            if (isProductIdInArray(quantitiesProductIDsARRAY, productId)) {

                const index = getIndexOfElement(quantitiesProductIDsARRAY, productId);
                quantitiesProductIDsARRAY[index].quantity = quantity;

            } else {

                quantitiesProductIDsARRAY.push({
                    productId: productId,
                    quantity: quantity,
                    ord: "",
                    ln: ""

                })

            }
        }

    }

    const clearFields = () => {
        products.forEach((product) => {
            document.getElementById("test" + product.id).value = "";
        })
    }



    // SAVE ORDER
    const saveOrder = (e) => {
        e.preventDefault();



        OrderService.createOrder(order).then((res) => {
            const data = res.data;
            const lOrd = data.lastOrd;


            let counter = 0;

            quantitiesProductIDsARRAY.forEach((item) => {

                counter = counter + 1;

                item.ln = counter;
                item.ord = lOrd;

                OrdLnService.createLine(item);
            })

            navigate("/orders");
        })


    }

    const checkData = () => {
        // console.log(quantitiesProductIDsARRAY);
        // console.log(order);
        //console.log(lastOrd);
        //document.getElementById('test7').disabled = true;

        // OrderService.createOrder(order).then((res) => {
        //     console.log(res.data.lastOrd);
        // })
    }




    return (
        <div>
            <div className="container mt-2">
                <form onSubmit={saveOrder}>
                    <div className="row d-flex justify-content-between ">
                        <div className="card col-lg-4 py-3">
                            <h3 className="text-center">General information</h3>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Employee Full Name</label>
                                    <select onClick={clearFields} className="form-control" value={order.employeeId} onChange={handleEmployeeFullName} required>
                                        <option key={0} value={0}>Select employee</option>
                                        {
                                            employees.map((employee) => {
                                                return (
                                                    <option key={employee.id} value={employee.id}>{employee.firstName + " " + employee.lastName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Order source</label>
                                    <select onClick={clearFields} className="form-control" value={orderSources.id} onChange={handleOrderSource} required>
                                        <option key={0} value={0}>Select order source</option>
                                        {
                                            orderSources.map((source) => {
                                                return (
                                                    <option key={source.id} value={source.id}>{source.description}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="card col-lg-7 py-3">
                            <div className="row">

                                <div className="col-lg-6 text-center">
                                    <h4>Product list</h4>
                                </div>

                                <div className="col-lg-6 text-center">
                                    <h4>Desired quantities</h4>
                                </div>

                            </div>
                            <div className="card-body">

                                {
                                    products.map((product) => {

                                        let disabled = product.quantity <= 0;

                                        if (product.active)
                                            return (

                                                <span className="form-group d-flex justify-content-center">

                                                    <div className="w-50">
                                                        <h3 className={product.quantity <= 0 ? "text-muted" : null}>{product.description}<span className="h5"> ({product.price}$/per piece)</span></h3>
                                                        <span className={product.quantity <= 0 ? "text-muted" : null}>(available quantity: {product.quantity})</span>
                                                        {
                                                            product.quantity <= 0 ? <b><span className="text-danger"> Out of stock!</span></b> : null
                                                        }
                                                    </div>
                                                    <input disabled={disabled} id={"test" + product.id} onChange={handleQuantitiesInput} data-key={product.id} type="number" min="0" className="form-control w-25 ml-4" />

                                                </span>
                                            )
                                        else return null;
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="row p-4 w-50">

                        <button type="submit" className="btn btn-primary mr-5">Save order</button>

                        <Link to={"/orders"}>
                            <button className="btn btn-danger my-1">Cancel</button>
                        </Link>

                    </div>
                </form >
            </div >

        </div >

    )
}

export default CreateOrderComponent
