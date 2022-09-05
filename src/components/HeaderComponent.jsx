import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderComponent() {
    return (
        <Navbar bg="dark" expand="lg" className="mb-5" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/" className="text-white">Order Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '150px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/employees" className="text-white">Employee</Nav.Link>
                        <Nav.Link href="/orders" className="text-white">Orders</Nav.Link>
                        <Nav.Link href="/add-employee" className="text-white">Add employee</Nav.Link>
                        <Nav.Link href="/add-order" className="text-white">Create new order</Nav.Link>
                        <Nav.Link href="/products" className="text-white">Products</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default HeaderComponent;
