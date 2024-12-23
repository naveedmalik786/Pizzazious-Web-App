import React, { useState } from 'react';
import OrderCard from './OrderCard';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from "axios";

function Orders()
{
    const [orders, setOrders ] = useState();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/user/${user[0].id}`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            setOrders(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    return(
        <div className='container p-3'>
            <div className='shadow-lg rounded rounded-4 p-3 row'>
                <div><h2>My Orders</h2></div>   
               {orders? orders.map((item) => <OrderCard item={item}/>) : "Loading..."}
            </div>
        </div>
    );
}

export default Orders;