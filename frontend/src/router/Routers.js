import React from "react";
import {Routes, Route,Navigate} from 'react-router-dom'

import Home from './../pages/home/Home';
import Login from './../pages/login/Login';
import About from '../pages/about/About';
import Facilities from '../pages/facilities/Facilities';
import Feedback from '../pages/feedback/Feedback';
import Rooms from '../pages/rooms/Rooms';
import Booking from '../pages/booking/Booking';
const Routers = () => {
    return (
        <Routes>
            <Route path ='/' element={<Navigate to='/home'/>} />
            <Route path ='/home' element={<Home/>} />
            <Route path ='/login' element={<Login/>} />
            <Route path ='/about' element={<About/>} />
            <Route path ='/Facilities' element={<Facilities/>} />
            <Route path ='/feedback' element={<Feedback/>} />
            <Route path ='/rooms' element={<Rooms/>} />
            <Route path ='/booking/:id' element={<Booking/>} />
        </Routes>
    )
}
export default Routers