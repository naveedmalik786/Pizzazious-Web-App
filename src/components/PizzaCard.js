import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';
import './PizzaCard.css'

function PizzaCard(props) {
   var link = "/product?id=" + props.id;
    return (
        <div className='pizcard col-xxl-4 col-xl-6 col-md-6 col-sm-12 flex-nowrap p-1' >
           <Link to={link}>
            <Card className='flex-row row m-0 h-100 shadow-lg' key={props.id}>
              <div className='col-5 p-0 d-flex align-items-center'>
                  <img alt="" src={props.img} className='w-100 card-img ps-2 pt-2 pb-2'></img>
              </div>
              <Card.Body className='col-7 justify-content-center align-items-center'>
                <div className='cardcont d-flex flex-column justify-content-evenly h-100'>
                  <h2>{props.title}</h2>
                  <h4>{props.desc}</h4>
                  <div className='btndiv d-flex align-items-center justify-content-between'>
                    <h3>Rs. {props.price}</h3>
                    <button className='btn btn-light btn-lg shadow-lg'>+</button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            </Link>
        </div>
    );
}
export default PizzaCard;