import React from 'react';
import './Checkout.css'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

import CartItem from './CartItem';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { emptyCard } from '../reduxStore/actions';
import { CashStack, CreditCard, CheckCircle, Handbag} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Map from './Map';

function Checkout() {
    const cItems = useSelector((state) => state.cart.value);
    const [oitems, setOitems] = useState(null);
    const user = useSelector((state) => state.user.value);

    const [radioValue, setRadioValue] = useState("1"); // Payment Option
    const [placed, setPlaced] = useState(false); // is Order Placed
    const [formData, setFormData]  = useState([]); // Form sub data
    const [ordDetails, setOrdDetails] = useState({});
    const [citems, setCitems] = useState(cItems);

    let tprice = 0;
    if(citems != "")
    {
        citems.map(element => {
            tprice += element.price * element.items;
        });
    }
    else if(oitems)
    {
        oitems.map(element => {
            tprice += element.price * element.items;
        });
    }

    const { Formik } = formik;
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fullName: yup.string().required(),
        number: yup.number().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        time: yup.string(),
        inst: yup.string(),
    });

  //Razor Pay Payment
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};

useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    setCitems(cItems);
});

function placeOrder(fdata)
{
    let paymethod = (radioValue === "2" ? "Card Payment" : "Cash On Delivery");

    let data = {
        'uid': user[0].id,
        'orderItems': citems,
        'deliveryDetails': fdata,
        'pmethod': paymethod,
        'amount': tprice,
        'status': 'Pending'
    }

    axios.post("http://localhost:8080/orders/add", data)
    .then(function (response) {
        // handle success
        setOitems(citems);
        dispatch(emptyCard([]));
        setPlaced(true);
    })
    .catch(function (error) {
        // handle error
        
    })
}

async function pay(fdata){
    if(user != 0)
    {
        if(radioValue === "2")
        {
            const data = await axios.get(`http://localhost:8080/razorpay/${tprice}`);
            const options = {
                key: "rzp_test_hE2NsqW3oAhWNq",
                currency: data.data.currency,
                amount: data.data.amount,
                name: "Order Payment",
                description: "Test Wallet Transaction",
                image: "/images/logo.png",
                order_id: data.data.id,
                handler: function (response) {
                    setOrdDetails({oid: response.razorpay_order_id, pid: response.razorpay_payment_id});
                    placeOrder(fdata);
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                },
                prefill: {
                name: formData.fullName,
                email: user[0].email,
                contact: formData.number,
                },
            };

            const paymentObject = new window.Razorpay(options);
                paymentObject.open();
        }
        else
        {
            placeOrder(fdata);
        }
    }
}

    return (
        <div className='conatiner p-3'>
            
            <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        setFormData(values);
                        //handleSubmit(values);
                        pay(values);
                        //alert(JSON.stringify(values));
                    }}
                    initialValues={{
                        fullName: '',
                        number: '',
                        address: '',
                        city: '',
                        time: '',
                        inst: ''
                    }}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div className='row shadow container p-4 gap-3 rounded-2 m-0'>
                            {placed ? 
                                            <div className='col-lg-7 p-4 shadow-sm rounded-4'>
                                                <div className='row'>
                                                    <div className="col-2">
                                                        <CheckCircle size={50}></CheckCircle>
                                                    </div>
                                                    <div className='col-10 text-start'>
                                                        {radioValue === "2" ? <h5>Order #{ordDetails.oid}</h5>
                                                        : <h5>Order Placed</h5>
                                                        }
                                                        <h6>Thank you {formData.fullName}!</h6>
                                                    </div>
                                                </div>
                                                <div className='row m-2'>
                                                    <Map add={formData.address} city={formData.city}/>
                                                </div>
                                                <div className='row m-2'>
                                                    <div className='row text-start border border-1 align-items-center p-3 m-0'>
                                                        <div className='col-lg-3'>
                                                            <p className='m-0'>Contact</p>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <strong>{formData.number}</strong>
                                                        </div>
                                                    </div>
                                                    <div className='row text-start border border-1 align-items-center p-3 m-0'>
                                                        <div className='col-lg-3'>
                                                            <p className='m-0'>Address</p>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <strong>{formData.address}, {formData.city}</strong>
                                                        </div>
                                                    </div>
                                                    <div className='row text-start border border-1 align-items-center p-3 m-0'>
                                                        <div className='col-lg-3'>
                                                            <p className='m-0'>Payment</p>
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <strong>{radioValue === "1" ? "Cash On Delivery" : "Card Payment"}</strong>
                                                        </div>
                                                    </div>
                                                    {radioValue === "2" ? 
                                                        <div className='row text-start border border-1 align-items-center p-3 m-0'>
                                                            <div className='col-lg-3'>
                                                                <p className='m-0'>Payment ID</p>
                                                            </div>
                                                            <div className='col-lg-9'>
                                                                <strong>{ordDetails.pid}</strong>
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                <div className='row m-2'>
                                                    <Link to="/" className='btn btn-lg btn-dark text-white'>Continue Shopping</Link>
                                                </div>
                                            </div> : 
                            <div className='col-lg-7 p-4 shadow-sm rounded-4'>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Enter your name'
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                        
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder='03001122333'
                                        name="number"
                                        value={values.number}
                                        onChange={handleChange}
                                        isInvalid={!!errors.number}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group as={Col} md="12" controlId="validationFormikUsername">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                            type="text"
                                            placeholder="House #, Street, Sector"
                                            aria-describedby="inputGroupPrepend"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            isInvalid={!!errors.address}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        isInvalid={!!errors.city}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Delivery Time (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Now or After 2 hours"
                                        name="time"
                                        value={values.time}
                                        onChange={handleChange}
                                        isInvalid={!!errors.time}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.time}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='mb-3'>
                                    <Form.Group as={Col} md="12" controlId="validationFormik05">
                                        <Form.Label>Special Instructions (Optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add any comment, e.g. about allergies, delivery  insts."
                                            name="inst"
                                            value={values.inst}
                                            onChange={handleChange}
                                            isInvalid={!!errors.inst}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.inst}
                                        </Form.Control.Feedback>
                                    </Form.Group>`
                                </Row>

                                <Row>
                                    <h5 className='text-lg-start mb-3'>Select Payment Method:</h5>
                                    <ButtonGroup>
                                        <ToggleButton
                                            key="1"
                                            id="1"
                                            type="radio"
                                            variant='outline-success'
                                            name="payment"
                                            value="1"
                                            checked={radioValue === "1"}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            <CashStack size={25} className='me-4'></CashStack>
                                            Cash On Delivery
                                        </ToggleButton>

                                        <ToggleButton
                                            key="2"
                                            id="2"
                                            type="radio"
                                            variant='outline-primary'
                                            name="payment"
                                            value="2"
                                            checked={radioValue === "2"}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            <CreditCard size={25} className='me-4'></CreditCard>
                                            Card Payment
                                        </ToggleButton>
     
                                    </ButtonGroup>
                                </Row>

                            </div>
                            }

                            <div className='col-lg p-4 shadow-sm rounded-4'>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='d-flex align-items-center gap-2 mb-2 ms-1'> 
                                        <Handbag size={29}></Handbag>
                                        <h5 className='m-0'>Your Order</h5>
                                    </div>
                                    <div className='cartItems'>
                                        {placed? oitems? oitems.map((item) => <CartItem item={item} sc={placed}/>) : null
                                        :
                                        citems.map((item) => <CartItem item={item} sc={placed}/>)}
                                    </div>

                                    <div className='d-flex flex-column p-2 border-top'>
                                        <div className='d-flex justify-content-between mt-2'>
                                            <p className='fw-medium'>Subtotal</p>
                                            <p>Rs. {tprice}.00</p>
                                        </div>
                                        <div className='d-flex justify-content-between'> 
                                            <p className='fw-medium'>Delivery Charges</p>
                                            <p>Rs. 0.00</p>
                                        </div>
                                        <div className='d-flex justify-content-between border-top pt-3'> 
                                            <h5>Grand total</h5>
                                            <h5>Rs. {tprice}.00</h5>
                                        </div>
                                        {placed ? null :
                                        <button onClick={tprice === 0 ? (e) => e.preventDefault() : null} type='submit' className='btn btn-danger btn-lg mt-2'>Place Order</button>}
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                        </Form>
                        )}
            </Formik>
        </div>
    );
}

export default Checkout;