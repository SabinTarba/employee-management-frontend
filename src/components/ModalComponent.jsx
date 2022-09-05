import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import ProductService from '../services/ProductService';


function ModalComponent({ currentQuantity, description, productId }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newQuantity, setNewQuantity] = useState({
        id: productId,
        quantity: 0
    });


    const handleNewQuantityInput = (e) => {
        setNewQuantity(prev => ({ ...prev, quantity: e.target.value }));
    }

    const handleSubmit = () => {

        ProductService.updateProduct(newQuantity).then((res) => {
            if (res.status === 200) {
                setShow(false);
                navigate(0);
            }
        })

    }

    return (
        <>
            <Button className="mx-2" variant="primary" onClick={handleShow}>
                Set stock
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Set quantity for: {description}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Current quantity: <b>{currentQuantity}</b>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3">
                            <Form.Label>New quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="New quantity"
                                autoFocus
                                onChange={handleNewQuantityInput}
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button type="submit" variant="primary" >
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalComponent