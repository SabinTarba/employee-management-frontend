import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import OrdLnService from "../../services/OrdLnService";
import OrderService from "../../services/OrderService";



function OrdlnComponent() {

    const navigate = useNavigate();
    const params = useParams();
    const ORD = params.ord;

    const [lines, setLines] = useState([]);
    let TOTAL_AMOUNT = 0;

    const getOrderLines = (ord) => {
        OrdLnService.getOrderLines(ord).then((res) => {
            setLines(res.data);
        })
    }

    useEffect(() => {
        getOrderLines(ORD);
    }, [ORD])


    const confirmOrder = (ord) => {
        OrderService.confirmOrder(ord).then((res) => {
            if (res.status === 200) {
                navigate("/orders");
                navigate(0);
            }
        });
    }


    return (
        <div className="container">

            <div className="row">
                <h3 className="text-white">Displaying lines for order: <span className="text-danger">{ORD}</span></h3>

            </div>

            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="card">


                        <div className="bootstrap-data-table-panel">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#Line</th>
                                            <th scope="col">Product description</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Unit price</th>
                                            <th scope="col">Amount per line</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lines.map((line) => {
                                                TOTAL_AMOUNT += line.quantity * line.price
                                                return (
                                                    <tr key={line.line}>
                                                        <td>{line.line}</td>
                                                        <td>{line.description}</td>
                                                        <td>{line.quantity}</td>
                                                        <td>{line.price}</td>
                                                        <td>{line.price * line.quantity} $</td>
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


            <div className="row mt-5 h4 d-flex justify-content-between w-75 text-white">
                <i>Total amount:&nbsp;<span className="text-warning"><b>{TOTAL_AMOUNT.toFixed(2)}$</b></span></i>
                <button className="btn my-2 btn-success" onClick={() => confirmOrder(ORD)}>Confirm order</button>
            </div>



        </div >
    )
}

export default OrdlnComponent