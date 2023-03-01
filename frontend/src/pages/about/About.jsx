import React from "react";
import "./about.css";
import { Row,Container } from 'reactstrap';
import award1 from './../../assets/images/award1.jpg';
import award2 from './../../assets/images/award2.jpg';
import award3 from './../../assets/images/award3.jpg';
import hotelview from '../../assets/images/intro1.jpg';
const About = () => {
    return (
            <>
            
            <div className="achivement">            
                <h1 className="text-center">Our achievement</h1>
                <Row className="row">
                    <div className="col-6 content">
                        <h2>2018 World Luxury Hotel Awards</h2>
                        <p>Established in 2006, World Luxury Hotel Awards is the pinnacle of achievement in the luxury hotel industry offering international recognition as voted by guests, travelers and industry players alike. Over 300 000 international travelers vote each year, during a four-week period to select the winners. Luxury hotels have the opportunity to participate in the World Luxury Hotel Awards by entering hotel categories that showcase their unique selling points and destinations.</p>
                       
                    </div>
                    <div className="col-6">
                        <img src={award1} alt="" />
                    </div>
                </Row>
                <hr />
                <Row className="row">
                    <div className="col-6 ">
                        <img src={award2} alt="" />
                    </div>
                    <div className="col-6 content">
                        <h2>
                            Tourism Award for excellence 2015-2016
                        </h2>
                        <p>Honouring boutique hotels from Shoreditch to California, and shortlisted by a panel of trailblazing travel experts, the Awards reveal the very best places for discerning travellers to visit.
                        The awards recognizes and rewards Hotels, Resorts, Boutique Hotels, Villas and Lodges, and spas that deliver exceptional levels of service and world-class facilities to its guests.
                        </p>
                    </div>

                </Row>
                <hr />
                <Row className="row">
                    <div className="col-6 content">
                        <h2>Top 100 best hotel 2016</h2>
                        <p>In 2016, we are selected to be top 100 best hotel in ASIA.Each of the individual Hotel of the Year Awards category winners are awarded a Gold embossed framed and mounted certificate which can be displayed in their hotel that will showcase their hotel as offering their guests a truly award-winning experience. The winning hotels & Spas in the 2023 Hotel of the Year and also the Top 100 hotels worldwide of 2023 will be prominently listed on our website for all to view along with all category winning hotels and spas.</p>
                    </div>
                    <div className="col-6 ">
                        <img src={award3} alt="" />
                    </div>
                </Row>
            </div>

           <Container>
           <h1 className='text-center'>A little about us</h1>
                <Row>
                    <p>
                        The hotel is located opposite of Hon Chong  Beach, just a few steps from the coast and about 100m from famous Hon Chong, where the most beautiful sunrise in Nha Trang.
                        With a staff of enthusiastic and professional service will give you the most comfortable and satisfied during your stay at the hotel.
                        With a blend of indigenous charm and International standards.
                        Navada Beach Hotel is the right choice for both business and leisure travelers, and is recognized by many customers for its outstanding service quality and location.
                        Come with us, you will enjoy the experience of a real holiday and unforgettable memories.
                    </p>
                </Row>
                <Row>
                    <div className="col-3">
                        <img src={hotelview} alt="" />
                    </div>
                    <div className="col-3">
                        <img src={hotelview} alt="" />
                    </div>
                    <div className="col-3">
                        <img src={hotelview} alt="" />
                    </div>
                    <div className="col-3">
                        <img src={hotelview} alt="" />
                    </div>
                </Row>
           </Container>
            </>
    )
}
export default About;