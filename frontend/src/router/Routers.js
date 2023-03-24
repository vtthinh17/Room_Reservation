import React from "react";
import {Routes, Route,Navigate} from 'react-router-dom'

import Home from './../pages/home/Home';
import Login from './../pages/login/Login';
import Register from "../pages/register/Register";
import About from '../pages/about/About';
import Facilities from '../pages/facilities/Facilities';
import Feedback from '../pages/feedback/Feedback';
import Rooms from '../pages/rooms/Rooms';
import BookingHistory from '../pages/bookinghistory/BookingHistory';
import UserProfile from '../pages/userprofile/UserProfile';
const Routers = () => {
    return (
        <Routes>
            <Route path ='/' element={<Navigate to='/home'/>} />
            <Route path ='/home' element={<Home/>} />
            <Route path ='/login' element={<Login/>} />
            <Route path ='/register' element={<Register/>} />
            <Route path ='/about' element={<About/>} />
            <Route path ='/Facilities' element={<Facilities/>} />
            <Route path ='/feedback' element={<Feedback/>} />
            <Route path ='/rooms' element={<Rooms/>} />
            <Route path ='/user/bookinghistory/' element={<BookingHistory/>} />
            <Route path ='/user/userprofile/' element={<UserProfile/>} />
        </Routes>
    )
}
export default Routers