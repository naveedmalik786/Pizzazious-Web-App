import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({});
    const [msg, setMsg] = useState("Success");
    const navigate = useNavigate();

    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");

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
        
            setMsg("Resetting...");
            setShow(true);
            
            axios.post(`http://localhost:8080/users/reset/${id}`, inputs)
            .then(function (response) {
                // handle success
                setMsg(response.data);
                setShow(true);
                navigate('/', { replace: true });
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

  return (
   <>
    <div className=' shadow-lg p-5 m-4 rounded-4'>
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible className="text-center">
            {msg}
            </Alert>

                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <h3>Enter new Password in the field below:</h3>

                    <Form.Control type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="New Password" className="rounded rounded-5 p-3" required/>

                    <button type="submit" className="btn btn-lg btn-success rounded rounded-pill fw-medium fs-4 logregbtn">Reset</button>
                    
                </Form>  
        </div>
   </>
  )
}

export default Reset