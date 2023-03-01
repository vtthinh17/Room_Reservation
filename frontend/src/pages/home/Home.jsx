import React from "react";
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./home.css";
import intro1 from './../../assets/images/intro1.jpg';
import intro2 from './../../assets/images/intro2.jpg';
import intro3 from './../../assets/images/intro3.jpg';
import intro4 from './../../assets/images/intro4.jpg';
import intro5 from './../../assets/images/intro5.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    return (
        <>
            <div className="Home">
                <span className="welcome">
                    BRAND HOTEL
                </span>
                <Link to='/rooms'>
                    <button className="booking-btn">Booking now <FontAwesomeIcon icon={faRightToBracket} /></button>
                </Link>
            </div>
            <Container className="intro">
                <Row>
                    <div className="text-center">
                        <h1>Welcome to Brand hotel</h1>
                        <p className="text-center">
                            Navada Beach Hotel is the right choice for both business and leisure travelers, and is recognized by many customers for its outstanding service quality and location.
                            Come with us, you will enjoy the experience of a real holiday and unforgettable memories.
                        </p>
                    </div>
                </Row>
                <Row>
                    <div className="col-4">
                        <img src={intro1} className="view" alt="" />
                    </div>
                    <div className="col-8">
                        <Row m>
                            <div className="col-6">
                                <img src={intro2} className="view" alt="" />
                            </div>
                            <div className="col-6">
                                <img src={intro3} className="view" alt="" />

                            </div>
                        </Row>
                        <Row>
                            <div className="col-6">
                                <img src={intro4} className="view" alt="" />
                            </div>
                            <div className="col-6">
                                <img src={intro5} className="view" alt="" />
                            </div>
                        </Row>
                    </div>
                </Row>

            </Container>
        </>

    )
}
export default Home;