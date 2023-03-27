import React from "react";
import './sidebar.css'
import logo from '../../assets/images/logo.png'
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faCommentDots, faHouseUser, faFileInvoiceDollar,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div >
                <img src={logo} alt="" id="sidebarImg" />
            </div>
            <div className="sidebarList">
                <ul>
                    <li className="sidebarItem">
                        <FontAwesomeIcon icon={faChartLine} className="sidebarItem_icon" />
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                    </li>
                    <li className="sidebarItem">
                        <FontAwesomeIcon icon={faUser} className="sidebarItem_icon" />
                        <NavLink to='/user'>Users</NavLink>
                    </li>
                    <li className="sidebarItem">
                    <FontAwesomeIcon icon={faHouseUser} className="sidebarItem_icon" />
                    <NavLink to='/rooms'>Rooms</NavLink>
                        </li>
                    <li className="sidebarItem">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="sidebarItem_icon" />
                    <NavLink to='/bookingorder'>Booking orders</NavLink>
                    </li>
                    <li className="sidebarItem">
                        <FontAwesomeIcon icon={faCommentDots} className="sidebarItem_icon" />
                        <NavLink to='/feedback'>Feedbacks</NavLink>
                    </li>
                    <li className="sidebarItem">
                        <FontAwesomeIcon icon={faRightFromBracket} className="sidebarItem_icon" />
                        <NavLink to='/login'>Sign out</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SideBar;