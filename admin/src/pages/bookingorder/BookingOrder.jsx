import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
const BookingOrder = () => {
    const { user, dispatch } = useContext(AuthContext);
    const dataBookingOrder = useFetch("/booking/")
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dataBookingOrder.data);
    },
        [dataBookingOrder.data]);
    const handleConfirm = async () => {
        console.log("change booking status")
        // refetch()
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
                                    {data.map((booking, index) =>
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
                                                    <td><Button outline color="warning" onClick={handleConfirm}>Confirm</Button></td> : null
                                                }
                                                {booking.bookingStatus === 2 ?
                                                    <td><span style={{ color: "red" }}>Cancel</span></td> : null
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
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "red" }}>You need to login first!</div>
            }
        </div>
    )
}
export default BookingOrder;