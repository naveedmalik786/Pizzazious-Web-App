import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import React from 'react';
import './Cart.css'
import CartItem from './CartItem';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux'

function Cart(props) {

    const citems = useSelector((state) => state.cart.value);

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false);};
    const handleShow = () => setShow(true);

    let tprice = 0;
    citems.map(element => {
        tprice += element.price * element.items;
    });
    
    useEffect(() => {
        // 👇️ only runs once
        if(props.show)
        {
            handleShow();
        }
      }, [props]); // 👈️ empty dependencies array
    return (
        <>
            <Offcanvas {...props} placement='end' backdrop="true">
                <Offcanvas.Header closeButton onHide={props.onHide}>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <hr className='m-0'></hr>
                <Offcanvas.Body className='d-flex flex-column gap-2 position-relative'>
                    <div className='cartItems'>
                        {citems.map((item) => <CartItem item={item}/>)}
                    </div>

                    <div className='d-flex flex-column bottom p-2 mb-2 border-top position-absolute bottom-0'>
                        <div className='d-flex justify-content-between'>
                            <p className='fw-medium'>Subtotal</p>
                            <p>Rs. {tprice}.00</p>
                        </div>
                        <div className='d-flex justify-content-between'> 
                            <p className='fw-medium'>Delivery Charges</p>
                            <p>Rs. 0.00</p>
                        </div>
                        <div className='d-flex justify-content-between'> 
                            <h5>Grand total</h5>
                            <h5>Rs. {tprice}.00</h5>
                        </div>
                        <Link onClick={tprice == 0 ? (e)=> e.preventDefault() : props.onHide} className="btn btn-danger btn-lg mt-2" to="/checkout"> Checkout </Link> 
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Cart;