import React from "react";
import "./header.css";
import {Container, Row} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import anonymous from './../../assets/images/anonymous_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
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
    const [profile,setProfile] = useState(true)
    const [profileEdit,setProfileEdit] = useState(false)
    // gọi sideEffect để thực hiện xóa token đi mỗi khi profile State thay đổi(click signOut) 
    useEffect(() => {
        console.log("change profileState");
        return ()=>{
            // clear token
            console.log("delete Token success")
            
        }
    }, [profile])
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
                            {/* if isLogin => hien thi profile else => hien thi Login/Logout */}
                            {profile
                            ?<div className="user_profile" onClick={() => setProfileEdit(!profileEdit)}>
                                <img src={anonymous} alt="Avatar"/>
                                <p className="user_name">UserName</p>                               
                                {profileEdit && <div className="user_menu">
                                    <ul>
                                        <li><Link to='/feedback'></Link>Edit profile</li>
                                        <li><Link to='/feedback'></Link>Booking history</li>
                                        <li onClick={()=>setProfile(false)}>Sign out <FontAwesomeIcon icon={faSignOut} /></li>
                                    </ul>
                                </div>}
                            </div>
                            :
                            <div className="login_register">                             
                                    <Link to='/login'>Login</Link> / <Link to='/register'>Register</Link>                              
                            </div>}
                            
                        </div>

                    </div>
                </Row>
            </Container>
        </header>
    )
}
export default Header;