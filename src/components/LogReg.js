import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Google } from "react-bootstrap-icons";
import './LogReg.css'
import { useState, useEffect } from 'react';
import axios from "axios";
import { addUser} from '../reduxStore/userActions';
import { useSelector, useDispatch } from 'react-redux'
import Alert from 'react-bootstrap/Alert';

import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';

function LogReg(props)
{
    const user = useSelector((state) => state.user.value);
    const[isLogin, setLogin] = useState(true);
    const[isForget, setForget] = useState(false);
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("Success");
    const [isEmailFound, setEmailFound] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [show]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!isLogin && !isForget)
        {
            setMsg("Registering...");
            setShow(true);
            
            axios.post("http://localhost:8080/users/register", inputs)
            .then(function (response) {
                // handle success
                setMsg(response.data);
                setShow(true);
            })
            .catch(function (error) {
                // handle error
                setMsg(error.response.data);
                setShow(true);
            })
            .then(function () {
                // always executed
            });
        }
        else if(isLogin && !isForget)
        {
            axios.post('http://localhost:8080/users', inputs)
            .then(function (response) {
                // handle success
                dispatch(addUser({id: response.data['_id'], name: response.data['name'], email: response.data['email'], google: 'false'}));
                props.onHide()
            })
            .catch(function (error) {
                // handle error
                setMsg(error.response.data);
                setShow(true);
            })
            .then(function () {
                // always executed
            });
        }
        else
        {
            setMsg("Resetting Paswword...");
            setShow(true);

            console.log(inputs);
            
            axios.post("http://localhost:8080/users/forgot", inputs)
            .then(function (response) {
                // handle success
                setEmailFound(response.data['found']);
                setMsg(response.data['msg']);
                setShow(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setMsg(error.message);
                setShow(true);
            })
            .then(function () {
                // always executed
            });
        }
    }

    const googlelogin = useGoogleLogin({
        onSuccess: codeResponse => {
            axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`)
            .then(function (response) {
                // handle success
                dispatch(addUser({id: response.data['sub'], name: response.data['name'], email: response.data['email'], google: 'true'}));
                props.onHide();
            })
            .catch(function (error) {
                // handle error
                
            })
        }
      });
      useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
          axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentialResponse.access_token}`)
          .then(function (response) {
              // handle success
              dispatch(addUser({id: response.data['sub'], name: response.data['name'], email: response.data['email'], google: 'true'}));
              props.onHide();
          })
          .catch(function (error) {
              // handle error
              
          })
        },
        onError: () => {
          console.log('Login Failed');
        },
      });

      function forgetpswrd()
      {
            setForget(true);
      }

    return(
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100">
                            <h1 className="text-center mt-2 text-white">{isLogin && !isForget? "Login" : isForget? "Reset Password" : "Register"}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-5">

                <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible className="text-center">
                   {msg}
                </Alert>

                    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        {isLogin ? null :
                        <Form.Control type="text" name="name" value={inputs.name || ""} onChange={handleChange} placeholder="Full Name" className="rounded rounded-5 p-3" required/>
                         }
                        <Form.Control type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Email Address" className="rounded rounded-5 p-3" required/>
                        {!isForget? 
                        <Form.Control type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Password" className="rounded rounded-5 p-3" required/>
                        : null}
                        {isLogin?
                            <p onClick={()=>forgetpswrd()} className="fpswrd">Forgot Password?</p>
                        :null}
                        <button type="submit" className="btn btn-lg btn-success rounded rounded-pill fw-medium fs-4 logregbtn">{isLogin && !isForget? "Login" : isForget? "Submit" : "Register"}</button>
                        
                    </Form>
                    {isLogin && !isForget ?
                    <div>
                        <h5 className="text-center m-4">Or Login With</h5>
                        <button onClick={() => googlelogin()} className="btn btn-lg btn-outline-danger rounded rounded-pill w-100 fw-bold"><Google className="me-3" size={30}></Google>Google</button>
                    </div>
                    : null}
                </Modal.Body>
                {!isForget? 
                <Modal.Footer className="justify-content-between ps-5 pe-5">
                    <h5 className="">{isLogin? "Don't have a account?" : "Already have a account?"}</h5>
                    <Button onClick={isLogin? () => setLogin(false) : () => setLogin(true)} className="logregbtn p-2 fs-5 fw-bold ps-5 pe-5">{isLogin? "Register" : "Login"}</Button>
                </Modal.Footer>
                : null}
            </Modal>
    );
}
export default LogReg;