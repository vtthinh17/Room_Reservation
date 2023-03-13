import React from "react";
import "./booking.css";
import { useParams } from "react-router-dom";
import room1 from './../../assets/images/room1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import instance from "../../service";
import useFetch from "../../hooks/useFetch";
// import { UncontrolledCarousel } from 'reactstrap';
const Booking = () => {
    const handleBooking = (e) => {
        // e.preventDefault();
        console.log('sent email and wait confirm => if(isConfirm) set room.status=pending -> room.status=confirmed')
    }
    const roomId  = useParams().id;
    const { data, loading, error } = useFetch("/rooms/find/"+roomId)
    
    // room();
    console.log(">>Room get from useFetch",data)
    return (
        <div className="container">
            <h1 className='text-center page-title'>Booking Room</h1>
            <div className="row">

            </div>
            <div className="row">
                {/* img */}
                <div className="col-6">
                    <div className="row">
                        <h2 className="text-center">Room {data.roomNumber}</h2>
                        <img src={data.image} alt="" />
                    </div>
                </div>
                {/* form */}
                <div className="col-6">
                    <p className="totalPrice">
                        {/* get numberDayBooking from Date */}
                        Your booking order: <b>{data.price}$ x 7 day = 140$</b>
                    </p>
                    <p className="notify">
                        Please fill in the form and then confirm your reservation within 30 minutes otherwise we will cancel your order
                    </p>
                    <div className="booking-form">
                        <div className="">
                            <label for="email">Email <FontAwesomeIcon icon={faEnvelope} /></label>
                            <input type="text" name="email" />
                        </div>
                        <div className="">
                            <label for="phone">Phone <FontAwesomeIcon icon={faMobileScreen} /></label>
                            <input type="text" name='phone' />
                        </div>
                        <button type="submit" onClick={handleBooking}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Booking;