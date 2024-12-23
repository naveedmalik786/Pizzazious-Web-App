import React from 'react';
import './Footer.css'

function Footer() {
    return (
      <div className='container footer'>
        <div className='row gap-3 justify-content-between shadow-lg p-3 m-2 text-start'>
            <div className='col-lg'>
                  <img src={'/images/logo.png'} className='footerlogo md-auto'></img>
            </div>
            <div className='col-lg'>
                  <h5 className='mb-4'>Pizzazious</h5>
                  <p>051111666667777</p>
                  <p>Support@pizzazious.com</p>
                  <p>Pizzaziou, Taimori Chowk, Main Road, Near Nadra Office, Islamabad</p>
            </div>
            <div className='col-lg me-5'>
              <h5 className='mb-4'>Our Timings</h5>
              <div className='d-flex justify-content-between gap-5'>
                <div>
                    <p>Monday - Thursday</p>
                    <p>Friday</p>
                    <p>Saturday - Sunday</p>
                </div>
                <div>
                    <p>11:00 AM - 03:00 AM</p>
                    <p>02:00 PM - 03:00 AM</p>
                    <p>11:00 AM - 03:00 AM</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
}
export default Footer;