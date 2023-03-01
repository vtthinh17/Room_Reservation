import React from "react";
import "./header.css";
import {Container, Row, Button} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import anonymous from './../../assets/images/anonymous_avatar.png';
import { MDBIcon } from 'mdb-react-ui-kit';
const nav__links =[
    {
        path:'/home',
        display: 'Home'
    },
    {
        path:'/about',
        display: 'About'
    },
    {
        path:'/facilities',
        display: 'Our Facilities'
    },
    {
        path:'/rooms/',
        display: 'Rooms'
    },
    {
        path:'/feedback',
        display: 'Feedback'
    },
]
const Header = () => {
    return (
        <header className="header">
            <Container>
                <Row>
                    <div className="nav__wrapper ">
                       {/* logo  */}
                            <div className="logo">
                            <Link to='/home'><img src={logo} alt="" /></Link>
                                
                            </div>
                        {/* logo end */}

                        <div className="navigation">
                            <ul className="menu">
                                {
                                    nav__links.map((item,index) => (
                                        <li className="nav__item nav__item-active">
                                            <NavLink to={item.path}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="nav__right ">
                            {/* check is */}
                            <div className="user_profile">
                                <img src={anonymous} alt="Avatar"/>
                                <p className="user_name">UserName</p>
                                
                                <MDBIcon fas icon="sign-out-alt" />Icon
                            </div>

                            <div className="nav__btns">
                                <Button className="btn">
                                    <Link to='/login'>Login/Register</Link>
                                </Button>
                                {/* <Button className="btn">
                                    <Link to='/register'>Register</Link>
                                </Button> */}
                            </div>
                        </div>

                    </div>
                </Row>
            </Container>
        </header>
    )
}
export default Header;