import { Link } from 'react-router-dom';

function HeaderComponent() {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">

            <div className="container d-flex justify-content-between">
                <span className="navbar-brand fs-5 fw-bold">Order Management System</span>

                <ul className="navbar-nav">
                    <Link to={'/'}>
                        <span className="nav-item nav-link active">Employees</span>
                    </Link>
                    <Link to={'/orders'}>
                        <span className="nav-item nav-link">Orders</span>
                    </Link>
                    <Link to={'/products'}>
                        <span className="nav-item nav-link">Products</span>
                    </Link>
                    <Link to={'/add-employee'}>
                        <span className="nav-item nav-link">Add employee</span>
                    </Link>
                    <Link to={'/add-order'}>
                        <span className="nav-item nav-link">Add order</span>
                    </Link>
                </ul>
            </div>

        </nav >
    )
}

export default HeaderComponent
