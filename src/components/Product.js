import './Product.css'
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../reduxStore/actions';
import { Check2Circle } from 'react-bootstrap-icons';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { connect } from 'mongoose';

function Product() {
    const [show, setShow] = useState(false);
    const [items, setItems] = useState(1);
    const [price, setPrice] = useState(0);
    const [vari, setVari] = useState("");

    const [postData, setPostData] = useState([]);
    const [sauces, setSauces] = useState();
    const [veggies, setVeggies] = useState();

    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

    const citems = useSelector((state) => state.cart.value);
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/prod/${id}`)
            .then(function (response) {
                // handle success
                setPostData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            axios.get(`http://localhost:8080/sauces/`)
            .then(function (response) {
                // handle success
                setSauces(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            axios.get(`http://localhost:8080/veggies/`)
            .then(function (response) {
                // handle success
                setVeggies(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    useEffect(()=>{
        if(postData.cat != "Pizza")
        {
            setPrice(postData.price);
        }
    }, [postData])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [show]);

    let sauce = "";
    let veg = [];

    function AddToCart()
    {
        if(vari != "" && postData.cat == "Pizza")
        {
            dispatch(add({ id: citems.length, img: postData.img , title: postData.title, var: vari, price: price, items: items, sauce: sauce, veggies: veg, cat: 'Pizza'}))
            setShow(true);
        }
        else if(postData.cat != "Pizza")
        {
            dispatch(add({ id: citems.length, img: postData.img , title: postData.title, price: price, items: items, cat: 'Other'}))
            setShow(true);
        }
    }
    const Increase = () => {
        setItems(items+1);
    } 
    const Decrease = () => {
        if(items > 1) {setItems(items-1)}
    };

    const onChangeVar = (event) => {
         setVari(event.target.value);
         switch(event.target.value)
         {
            case 'Regular':
                setPrice(postData.var[0].price);
                break;
            case 'Large':
                setPrice(postData.var[1].price);
                break;
            case 'Party':
                setPrice(postData.var[2].price);
                break;
            default:
                setPrice(0);
         }
    }
    const onChangeSauce = (event) => {
        sauce = event.target.value;
    }
    const onChangeVeggies = (event) => {
        let matched = false;
        if(event.target.checked)
        {
            veg.push(event.target.value);  
        }
        else
        {
            veg = veg.filter((item) => item !== event.target.value);
        }
    }
    
    return (
        <div className='container p-4 position-relative'>

            <Alert show={show} variant="success" className='d-flex gap-3 rounded-5 justify-content-center align-items-center position-fixed prodAlert'>
                <Check2Circle size={30}></Check2Circle>
                <h5 className='m-0'>Item Added to Cart!</h5>
            </Alert>

            <div className='container row productbg shadow-lg m-0'>
                <div className='col-lg-5 pt-1 d-flex justify-content-center align-items-center'>
                    <img className='img-fluid' src={postData.img}></img>
                </div>
                <div className='col-lg-7 p-5'>
                    <div className='d-flex text-start'>
                        <div>
                            <h1>{postData.title}</h1>
                            <p>{postData.desc}</p>
                        </div>
                        <button className='btn btn-light rounded-pill shadow-lg h-100'><img src={ '/images/heart.png'}></img></button>
                    </div>

                    {postData.cat == "Pizza" ?

                    <Accordion defaultActiveKey="0" className='d-flex flex-column gap-3 my-4'>
                        <Accordion.Item eventKey="0" className='border rounded overflow-hidden'>
                            <Accordion.Header>Variation [Required]</Accordion.Header>
                            <Accordion.Body onChange={onChangeVar}>
                            
                            {postData.var != undefined ?
                            postData.var.map((item) => {
                                    return(
                                        <div className='d-flex justify-content-between'>
                                        <Form.Check type="radio" aria-label="radio 1" name="var" label={item.name} value={item.name}/> 
                                        <p>Rs. {item.price}.00</p>
                                        </div>
                                    )
                                }) : null}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className='border rounded overflow-hidden'>
                            <Accordion.Header>Sauce</Accordion.Header>
                            <Accordion.Body onChange={onChangeSauce}>
                                {sauces?
                                sauces.map((item) => {
                                        return(
                                            <div className='d-flex justify-content-between'>
                                            <Form.Check type="radio" aria-label="sauces" name="sauce" label={item.title} value={item.title}/> 
                                            <p>Rs. 0.00</p>
                                            </div>
                                        )
                                    }) : null}
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2" className='border rounded overflow-hidden'>
                            <Accordion.Header>Veggies</Accordion.Header>
                            <Accordion.Body onChange={onChangeVeggies}>
                                {veggies?
                                veggies.map((item) => {
                                        return(
                                            <div className='d-flex justify-content-between'>
                                            <Form.Check type="checkbox" aria-label="checkboxes" name="veggies" label={item.title} value={item.title}/> 
                                            <p>Rs. 0.00</p>
                                            </div>
                                        )
                                    }) : null}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    : <div className='m-4 p-4'></div> }

                    <div className='row d-flex justify-content-between align-items-center mt-4 gap-3'>
                        <div className='d-flex col-lg-2 justify-content-between gap-1'>
                            <button onClick={Decrease} className='btn btn-danger rounded-pill shadow-lg h1 m-0'>-</button>
                            <Form.Control placeholder="1" type='number' value={items} disabled className='rounded-pill text-center bg-white h1 m-0 fw-bold' style={{minWidth: '60px', maxWidth: '120px'}}/>
                            <button onClick={Increase} className='btn btn-danger rounded-pill shadow-lg h1 m-0'>+</button>
                        </div>
                        <div className='addtobtn col-lg-7'>
                            <button onClick={AddToCart} className='btn btn-danger btn-lg rounded-pill d-flex align-items-center shadow-lg w-100 justify-content-between'>
                                <p className='m-0'>Rs. {price * items}.00</p>
                                <h5 className='m-0'>Add to Cart</h5>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
