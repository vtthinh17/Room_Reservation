import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './../pages/login/Login';
import Dashboard from "../pages/dashboard/Dashboard";
import Feedback from "../pages/feedback/Feedback";
import BookingOrder from "../pages/bookingorder/BookingOrder";
import Rooms from "../pages/room/Rooms";
import User from "../pages/user/User";
const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/bookingorder' element={<BookingOrder />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/user' element={<User />} />
        </Routes>
    )
}
export default Routers