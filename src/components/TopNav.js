import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Cart3, PersonSquare } from 'react-bootstrap-icons';
import { useState } from 'react';
import Cart from './Cart';
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import LogReg from './LogReg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { removeUser } from '../reduxStore/userActions';
import { googleLogout } from '@react-oauth/google';

import './TopNav.css'

function TopNav(props) {
  const citems = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = React.useState(false);

  function logout()
  {
    dispatch(removeUser([])); 
    if(user[0].google == 'true') {
      googleLogout();
    } 
  }

  const handleProduct = () => props.setpState(false);
    return (
      <div className='container'>
          <Cart show={show} onHide={() => setShow(false)}/>
          <LogReg show={modalShow} onHide={() => setModalShow(false)} />
          <Navbar expand="lg" className="bg-transparent my-5 mb-4">
            <Container fluid>
              <Navbar.Brand onClick={handleProduct} href="#" className='d-flex gap-2'>
                <img
                alt=""
                src={'/images/logo.png'}
                width="50"
                height="50"
                className="d-inline-block align-top"
                />
                <h2 className='m-auto'>Pizza</h2>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="m-auto me-5 my-2 my-lg-0 gap-4 align-items-center"
                >
                  <Link to="/"><Nav.Link href='/'>Home</Nav.Link></Link>
                  {user != 0 ? <Link to="/orders"><Nav.Link href="/Menu">Orders</Nav.Link></Link> : null}
                  <Nav.Link className='d-flex align-items-center' onClick={user == 0 ? () => setModalShow(true) : null}>
                      <PersonSquare className='me-2' size={28}></PersonSquare> {user != 0?
                      <NavDropdown title={user != 0 ? user[0].name : null} id="nav-dropdown">
                        <NavDropdown.Item eventKey="1.1">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => logout()} eventKey="1.2">Logout</NavDropdown.Item>
                      </NavDropdown>
                      : null} </Nav.Link>
                  <Nav.Link className='position-relative' onClick={handleShow}><Cart3 size={28}></Cart3> <Badge className='position-absolute top-0 end-0' bg="secondary">{citems.length}</Badge> </Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    );
}

export default TopNav;