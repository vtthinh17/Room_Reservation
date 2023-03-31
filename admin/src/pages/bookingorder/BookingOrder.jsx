import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BookingOrder = () => {
    const { user, dispatch } = useContext(AuthContext);
    const  {data,reFetch}= useFetch("/booking/")
    const [dataBookingOrder, setDataBookingOrder] = useState([])
    useEffect(() => {
        setDataBookingOrder(data);
    },
        [data]);
    const handleConfirm = async (selectedBookingOrder) => {
        // console.log("selected booking:",selectedBookingOrder)
        await instance.put("/booking/update/"+selectedBookingOrder._id,{bookingStatus:2});
        reFetch();
    }
    const handleDelete = async (selectedBookingOrder) => {
        // console.log("selected booking:",selectedBookingOrder)
        await instance.delete("/booking/delete/"+selectedBookingOrder._id);
        reFetch();
    } 
    return (
        <div className="BookingOrder">
            {user ?
                (<Container>
                    {data.length > 0 ?
                        <Row>
                            <h2 className="text-center">Booking orders list</h2>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>UserID</th>
                                        <th>Dates serve</th>
                                        <th>TotalPrice</th>
                                        <th>Booking time</th>
                                        <th>Booking Status</th>
                                    </tr >
                                </thead >
                                <tbody>
                                    {dataBookingOrder.map((booking, index) =>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{booking.userID}</td>
                                            <td>from {booking.dateServe.startServe} to {booking.dateServe.endServe}</td>
                                            <td>{booking.totalPrice}$</td>
                                            <td>{booking.bookingAt}</td>

                                            <>
                                                {booking.bookingStatus === 0 ?
                                                    <td><span style={{ color: "green" }}>Success</span></td> : null
                                                }
                                                {booking.bookingStatus === 1 ?
                                                    <td><Button color="warning" onClick={()=>handleConfirm(booking)}>Confirm</Button></td> : null
                                                }
                                                {booking.bookingStatus === 2 ?
                                                    <td><span style={{ color: "red" }}>Cancel --{'>'}<FontAwesomeIcon onClick={()=>handleDelete(booking)} icon={faTrashCan}/></span></td> : null
                                                }
                                            </>
                                        </tr>

                                    )}
                                </tbody>
                            </Table >
                        </Row>
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Loading data...</div>
                    }
                </Container>
                )
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>
            }
        </div>
    )
}
export default BookingOrder;