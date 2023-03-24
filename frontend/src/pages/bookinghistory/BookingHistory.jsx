import React, { useState, useContext } from "react";
import './bookinghistory.css'
import instance from "../../service";
import { Container, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { format } from 'date-fns';
const BookingHistory = () => {
    // const t = new Date()
    // console.log(">>>dasewqewqeqwew:",t.toString().slice(0,15))
    const handleCancleOrder = async (bookingId) => {
        if (window.confirm("Do you sure to cancel this order?")) {
            try {

                await instance.put("/booking/update/"+bookingId);
                // refect de lay lai danh sach Order List va render lai giao dien sau khi xoa
                reFetch();
                console.log("refetch data............")
                console.log("Update status order success")
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Undo cancel order,nothing change ")
        }
    }
    const { user } = useContext(AuthContext)
    const { data, loading, error,reFetch } = useFetch("/booking/" + user._id)
    return (
        <Container className="BookingHistory">
            <h3 className="text-center mb-3 mt-3">Booking history</h3>
            {
                loading
                    ? (<h3 className='text-center'>Loading data...</h3>)
                    : (
                        <Table striped>
                            {console.log(">>>fetch History data:", data)}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>BookingID</th>
                                    <th>Dates</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr >
                            </thead >
                            <tbody>
                                {data.map((booking, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{booking._id}</td>
                                        <td>from {booking.dateServe.startServe} to {booking.dateServe.endServe}</td>
                                        <td>{booking.totalPrice}$</td>
                                        {/* check status to show text */}
                                        <>
                                            {booking.bookingStatus === 0 ?
                                                <td>Cancel</td> : null
                                            }
                                             {booking.bookingStatus === 1 ?
                                                <td>Pending confirm</td> : null
                                            }
                                             {booking.bookingStatus === 2 ?
                                                <td>Success</td> : null
                                            }
                                        </>        
                                        {/* check status to show icon */}
                                        <>
                                            {booking.bookingStatus === 0 ?
                                                <td><FontAwesomeIcon icon={faXmark} /></td> : null
                                            }
                                             {booking.bookingStatus === 1 ?
                                                <td><FontAwesomeIcon onClick={()=>handleCancleOrder(booking._id)} icon={faTrashCan} /></td> : null
                                            }
                                             {booking.bookingStatus === 2 ?
                                                <td><FontAwesomeIcon icon={faCircleCheck} /></td> : null
                                            }
                                        </>                                   
                                    </tr>

                                )}
                            </tbody>
                        </Table >
                    )
            }
        </Container >
    )
}
export default BookingHistory;