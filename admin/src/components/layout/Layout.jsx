import React from "react";
import Routers from "../../router/routers";
import SideBar from "../sidebar/SideBar";
import Topbar from "../topbar/Topbar";
import './layout.css';
const Layout = () => {
    return (
        <>
            <div className="layout">
                <SideBar className="sidebar" />
                <div className="mainLayout">
                    <Topbar/>
                    <Routers />
                </div>
            </div>
        </>
    )
}
export default Layout;