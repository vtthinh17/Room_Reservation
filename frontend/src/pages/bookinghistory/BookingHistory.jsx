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

                await instance.put("/booking/update/" + bookingId);
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
    console.log("current user:", user)
    const { data, loading, error, reFetch } = useFetch("/booking/" + user._id)
    console.log("current data booking history:", data)
    return (
        <Container className="BookingHistory">
            <h3 className="text-center mb-3 mt-3">Booking history</h3>
            {   
                loading
                    ? (<h3 className='text-center'>Loading data...</h3>)
                    : (
<<<<<<< Updated upstream
                       <div>
                        {data.length>0? <Table striped>
=======
                        <div>
                            {data.length>0?<Table striped>
>>>>>>> Stashed changes
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

                                        {booking.bookingStatus === 0 ?
                                            <td style={{ color: "red" }}>Cancel</td> : null
                                        }
                                        {booking.bookingStatus === 1 ?
                                            <td>Pending confirm...</td> : null
                                        }
                                        {booking.bookingStatus === 2 ?
                                            <td style={{ color: "green" }}>Success</td> : null
                                        }


                                        {booking.bookingStatus === 1 ?
                                            <td><FontAwesomeIcon onClick={() => handleCancleOrder(booking._id)} icon={faTrashCan} /></td> : null
                                        }
                                    </tr>

                                )}
                            </tbody>
                        </Table >
<<<<<<< Updated upstream
                        :<div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", height: "27vh", color: "grey" }}>You have not booked any room yet!</div>
                        }
                       </div>
=======
                                    : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "27vh", color: "grey" }}>Empy booking history!</div>
  
                    }
                        </div>
>>>>>>> Stashed changes
                    )
            }
        </Container >
    )
}
export default BookingHistory;