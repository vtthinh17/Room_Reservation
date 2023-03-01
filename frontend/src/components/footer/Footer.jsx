import React from "react";
import { Container, Row } from 'reactstrap';
import "./footer.css";
import logo from './../../assets/images/logo_footer.jpg';
const Footer = () => {
    return (
        <footer>
            <hr />
            <Container>
                <Row>
                    <div className="col-4">
                        <img src={logo} alt="" />
                    </div>

                    <div className="col-4">
                        <h4>Contacts us</h4>
                        <ul>
                            <li>Website: hotelbrand.com.vn</li>
                            <li>Email: hotelbrand@gmail.com</li>
                            <li>Phone: 0999 234 567</li>
                        </ul>
                    </div>

                    <div className="col-4">
                        <h4>Support</h4>
                        <ul>
                            <li>Policy</li>
                            <li>Service</li>
                            <li>Refund</li>
                        </ul>
                    </div>


                </Row>
            </Container>
        </footer>
    )
}
export default Footer;