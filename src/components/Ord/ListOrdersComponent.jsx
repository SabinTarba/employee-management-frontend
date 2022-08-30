import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EmployeeService from '../../services/EmployeeService';
import OrderService from '../../services/OrderService';
import OrderStatus from './OrderStatus';
import { Link } from 'react-router-dom';


function ListOrdersComponent() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [ordStatus, setOrdStatus] = useState(new Map());
    const [employees, setEmployees] = useState(new Map());


    const getOrders = () => {
        OrderService.getOrders().then((res) => {
            setOrders(res.data);
        })
    }

    const getStatusOfOrders = () => {
        let myMap = new Map();

        let checkLSStatusOfOrders = localStorage.getItem("status_of_orders");

        if (checkLSStatusOfOrders) {

            const statusOfOrders = JSON.parse(checkLSStatusOfOrders);

            statusOfOrders.forEach((status) => {
                myMap.set(status.id, status.descr);
            })

            setOrdStatus(myMap);
        }
        else {

            OrderService.getStatusOfOrders().then((res) => {
                const data = res.data;

                localStorage.setItem("status_of_orders", JSON.stringify(data));


                data.forEach((status) => {
                    myMap.set(status.id, status.descr);
                })

                setOrdStatus(myMap);

            })
        }

    }

    const getEmployees = () => {


        EmployeeService.getEmployees().then((res) => {
            let myMap = new Map();

            const data = res.data;

            data.forEach((employee) => {
                myMap.set(employee.id, employee);
            })

            setEmployees(myMap);
        })

    }

    const deleteOrder = (id) => {
        OrderService.deleteOrder(id).then((res) => {
            if (res.status === 200) {
                navigate(0);
            }
        })
    }

    const getStatusDescription = (status) => {
        return ordStatus.get(status);
    }

    const getFullNameOfEmployee = (id) => {
        const lname = employees.get(id).lastName;
        const fname = employees.get(id).firstName;

        return lname + " " + fname;
    }

    useEffect(() => {
        getEmployees();
        getOrders();
        getStatusOfOrders();
    }, [])



    return (
        <div className="container">
            <Link to={"/add-order"}>
                <button className="btn btn-success mb-3">Create new order</button>
            </Link>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bootstrap-data-table-panel">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#Order id</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Employee Full Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order) => {
                                            return (
                                                <tr key={order.ord}>
                                                    <td>{order.ord}</td>
                                                    <td>{order.dt}</td>
                                                    <td>{getFullNameOfEmployee(order.employeeId)}</td>
                                                    <OrderStatus status={getStatusDescription(order.status)}></OrderStatus>
                                                    <td><button className="btn btn-danger" onClick={() => deleteOrder(order.ord)}>Delete</button></td>

                                                </tr>

                                            )

                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default ListOrdersComponent