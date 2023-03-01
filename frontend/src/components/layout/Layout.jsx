import React from "react";

import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import Routers from "../../router/Routers";
const Layout = () => {
    return (
        <>
            <Header/>
            <Routers/> 
            <Footer/>
        </>
    )
}
export default Layout;