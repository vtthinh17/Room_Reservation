import { React, useContext } from "react";
import Routers from "../../router/routers";
import SideBar from "../sidebar/SideBar";
import Topbar from "../topbar/Topbar";
import './layout.css';
import { AuthContext } from "../../contexts/AuthContext";
const Layout = () => {
    const { user, dispatch } = useContext(AuthContext);
    return (
        <>
            <div className="layout">
                <SideBar className="sidebar" />
                <div className="mainLayout">
                    <Topbar />
                    <Routers />                
                </div>
            </div>
        </>
    )
}
export default Layout;