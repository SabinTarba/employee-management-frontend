import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OrderService from '../../services/OrderService';
import OrderStatus from './OrderStatus';
import { Link } from 'react-router-dom';


function ListOrdersComponent() {

    const navigate = useNavigate();

    const [ordersInfo, setOrdersInfo] = useState([]);



    const getOrdersInfoFull = () => {
        OrderService.getOrdersInfo().then((res) => {
            setOrdersInfo(res.data);
        })
    }

    const deleteOrder = (id) => {
        OrderService.deleteOrder(id).then((res) => {
            if (res.status === 200) {
                navigate(0);
            }
        })
    }

    useEffect(() => {
        getOrdersInfoFull();
    }, [])


    const processOrder = (ord) => {

        OrderService.processOrder(ord).then(() => {
            if (res.status === 200) {
                navigate(0);
            }
        });
    }





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
                                        <th scope="col">Source</th>
                                        <th scope="col"><span className="ml-3">Status</span></th>
                                        <th scope="col" className="text-center"><span>Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ordersInfo.map((order) => {
                                            return (
                                                <tr key={order.ord}>
                                                    <td>{order.ord}</td>
                                                    <td>{order.dt}</td>
                                                    <td>{order.fullName}</td>
                                                    <td>{order.originDescription}</td>
                                                    <OrderStatus status={order.statusDescription}></OrderStatus>
                                                    <td>
                                                        <div className="container d-flex justify-content-center">
                                                            <button className="btn btn-danger" onClick={() => deleteOrder(order.ord)}>Delete</button>
                                                            {
                                                                order.statusDescription === "Ready" ? <button className="btn btn-secondary mx-2" onClick={() => processOrder(order.ord)}>Process</button> : null
                                                            }
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
                </div >
            </div>
        </div >
    )
}

export default ListOrdersComponent
