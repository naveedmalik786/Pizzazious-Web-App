import React, { useState } from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux'

function OrderCard(props)
{
    const pitem = props.item;
    const[items, setItems] = useState(pitem);
    return(
        <div className='container p-3 col-lg-6 h-100 m-0'>
            <div className='shadow-lg p-3 rounded rounded-4'>
                <div>
                    <h5>Order ID: {items['_id']}</h5>
                </div>
               {items['orderItems'].map((item) => <CartItem item={item} sc={true}/>)}
               <div className='p-4'>
                    <div className='d-flex justify-content-between'>
                        <h5>Total Amount: </h5>
                        <h5 className='fw-normal'>Rs. {items['amount']}</h5>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Payment Method: </h5>
                        <h5 className='fw-normal'>{items['pmethod']}</h5>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Ordered On: </h5>
                        <h5 className='fw-normal'>{items['createdAt']}</h5>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>Order Status: </h5>
                        <h5 className='fw-normal'>{items['status']}</h5>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default OrderCard;