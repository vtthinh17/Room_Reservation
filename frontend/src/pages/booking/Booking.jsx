import React from "react";
import "./booking.css";
import room1 from './../../assets/images/room1.jpg';
import room2 from './../../assets/images/room2.jpg';
import room3 from './../../assets/images/room3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledCarousel } from 'reactstrap';
const views = [
    {
      src: room1,
      altText: 'Slide 1',
      caption: 'Beautiful view',
      header: 'Slide 1 Header'
    },
    {
      src: room2,
      altText: 'Slide 2',
      caption: 'High end furniture',
      header: 'Slide 2 Header'
    },
    {
      src:room3,
      altText: 'Slide 3',
      caption: 'Full of amenities',
      header: 'Slide 3 Header'
    }
  ];
const Booking = () => {
    const handleBooking = (e)=>{
        // e.preventDefault();
        console.log('sent email and wait confirm => if(isConfirm) set room.status=pending -> room.status=confirmed')
    }
    return (
        <div className="container">
            <h1 className='text-center page-title'>Booking Room</h1>
            <div className="row">

            </div>
            <div className="row">
                {/* img */}
                <div className="col-6">
                    <div className="row">
                        <UncontrolledCarousel 
                        indicators={false}
                        items={views} 
                        caption={true}
                        />
                    </div>
                </div>
                {/* form */}
                <div className="col-6">
                    <p className="totalPrice">
                        {/* get numberDayBooking from Date */}
                        Your booking order: <b>20$ x 7 day = 140$</b>
                    </p>
                    <p className="notify">
                        Please fill in the form and then confirm your reservation within 30 minutes otherwise we will cancel your order
                    </p>
                    <div className="booking-form">
                        <div className="">
                            <label for="email">Email <FontAwesomeIcon icon={faEnvelope}/></label>
                            <input type="text" name="email"/>
                        </div>
                        <div className="">
                            <label for="phone">Phone <FontAwesomeIcon icon={faMobileScreen}/></label>
                            <input type="text" name='phone'/>
                        </div>
                        <button type="submit" onClick={handleBooking}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Booking;