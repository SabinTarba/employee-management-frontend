import OrderService from "../../services/OrderService";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from "../../services/EmployeeService";





function CreateOrderComponent() {

    const navigate = useNavigate();
    var date = new Date();

    const [employees, setEmployees] = useState([]);
    const [order, setOrder] = useState({
        dt: date,
        employeeId: "",
        status: "W",

    });


    const getEmployees = () => {
        EmployeeService.getEmployees().then((data) => {
            setEmployees(data.data);
        })
    }

    useEffect(() => {
        getEmployees();
    }, [])


    const handleEmployeeFullName = (e) => {

        let updatedValue = { employeeId: e.target.value };
        setOrder(order => ({
            ...order,
            ...updatedValue
        }));

    }

    const saveOrder = (e) => {
        e.preventDefault();

        OrderService.createOrder(order).then(() => {
            navigate("/orders");
        })
    }



    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 py-3">
                        <h3 className="text-center">Add Order</h3>
                        <div className="card-body">
                            <form onSubmit={saveOrder}>
                                <div className="form-group">
                                    <label>Employee Full Name</label>
                                    <select className="form-control" value={order.employeeId} onChange={handleEmployeeFullName} required>
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


                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Save</button>


                                    <Link to={"/orders"}>
                                        <button className="btn btn-danger" style={{ margin: "25px" }}>Cancel</button>
                                    </Link>
                                </div>





                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default CreateOrderComponent