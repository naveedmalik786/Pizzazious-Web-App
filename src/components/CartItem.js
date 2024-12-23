import React from 'react';
import './CartItem.css'
import { DashSquareFill, PlusSquareFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux'
import { remove, increaseItem, decreaseItem } from '../reduxStore/actions';

function CartItem(props) {
    const dispatch = useDispatch()

    const Increase = () => {
        dispatch(increaseItem(props.item.id))
    } 
    const Decrease = () => {
        if(props.item.items > 1) {dispatch(decreaseItem(props.item.id))}
        else
        {
            dispatch(remove(props.item.id))
        }
    };
    return (
        <>
            <div className='pItem row d-flex align-items-center m-1 p-2 position-relative'>
                <div className='col-3 p-0'>
                    <img className='img-fluid rounded-2' src={props.item.img}></img>
                </div>
                <div className='col-9 text-lg-start' key={props.item.id}>
                    <h5 className='my-1'>{props.item.title}</h5>
                    {props.item.cat == "Pizza"? <>
                    <h6 className='text-secondary m-0'>{props.item.var}</h6>
                    <h6 className='text-secondary m-0'>Sauce: {props.item.sauce}</h6>
                    </> : null}
                    <h5 className='text-success my-1'>Rs. {props.item.items * props.item.price}.00</h5>
                </div>
                <div className='pItemBtns d-flex gap-2 align-items-center position-absolute'>
                    {!props.sc ?
                    <button className='btn p-0' onClick={Decrease}><DashSquareFill size={25}></DashSquareFill></button>
                    : null }
                    <h4 className='m-0'>0{props.item.items}</h4>
                    {!props.sc ?
                    <button className='btn p-0' onClick={Increase}><PlusSquareFill size={25}></PlusSquareFill></button>
                    : null}
                </div>
            </div>
        </>
    );
}

export default CartItem