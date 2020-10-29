import React from 'react'
import {Navbar, Collapse, NavbarBrand, Nav, NavLink, NavItem, NavbarToggler} from 'reactstrap'
import { useState } from 'react'
import quicklogo from '../assets/images/quick-logo.jpg'
import rutaIcon from '../assets/images/ruta.png';
import './styles/navbar.css'

const NavBar = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
        <Navbar color="primary" className="navbar-color" light expand="md">
           <NavbarBrand><img src={rutaIcon} width="80" height="80" className="ml-3" /> </NavbarBrand>
           <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <h3 className="text-title">SmartRoute</h3>
                    <NavItem>
                        <NavLink href="https://smartroutes.herokuapp.com/">About Page</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default NavBar