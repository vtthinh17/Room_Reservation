import React from "react";
import "./facilities.css";
import { Container, Row } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faPersonSwimming, faUtensils, faHeadset, faStore , faTruckPlane, faSquareParking, faDumbbell,faPaw } from '@fortawesome/free-solid-svg-icons';
const Facilites = () => {
    return (
        <>

            <div className="Facilities">
            {/* We always try to give out best service to satisfy our customer,that help us stand out from others hotel. Here are facilities of our hotel, if you have any question or request, dont hesitage to call us at +84 848484 */}
                <h1 className="text-center facility-title">Our Facilities</h1>
                <Container className="service-list">
                <Row>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faTruckPlane} />
                        <p>Transport pickup at airport</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faWifi} />
                        <p>Free wifi</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faPersonSwimming} />
                        <p>Swimming pool</p>
                    </div>

                </Row>
                <Row>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faUtensils} />
                        <p>Restaurant</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faHeadset} />
                        <p>Support available 24/7, call +84 848484</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faSquareParking} />
                        <p>On-site parking</p>
                    </div>
                </Row>
                <Row>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faDumbbell} />
                        <p>Gym site</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faPaw} />
                        <p>Pets service</p>
                    </div>
                    <div className="col-4 services">
                        <FontAwesomeIcon className="icons" icon={faStore} />
                        <p>Convenient store</p>
                    </div>
                </Row>
                </Container>

            </div>

        </>


    )
}
export default Facilites;