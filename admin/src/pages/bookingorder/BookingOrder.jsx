import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button, UncontrolledTooltip } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BookingOrder = () => {
    const { user, dispatch } = useContext(AuthContext);
    const { data, reFetch } = useFetch("/booking/")
    const [dataBookingOrder, setDataBookingOrder] = useState([])
    useEffect(() => {
        setDataBookingOrder(data);
    },
        [data]);
    const handleConfirm = async (selectedBookingOrder) => {
        await instance.put("/booking/update/" + selectedBookingOrder._id, { bookingStatus: 0 });
        reFetch();
    }
    const handleDelete = async (selectedBookingOrder) => {
        if (window.confirm('Do you want to delete this order?') === true) {
            try {
                await instance.delete("/booking/delete/" + selectedBookingOrder._id);
                reFetch();
            } catch (error) {
            }
        } else { }

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
                                        <th>BookingID</th>
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
                                            <td>{booking._id}</td>
                                            <td>{booking.totalPrice}$</td>
                                            <td>
                                                from {(new Date(booking.dateServe.startServe)).getDate()}/{(new Date(booking.dateServe.startServe)).getMonth() + 1}/{(new Date(booking.dateServe.startServe)).getFullYear()} to {(new Date(booking.dateServe.endServe)).getDate()}/{(new Date(booking.dateServe.endServe)).getMonth() + 1}/{(new Date(booking.dateServe.endServe)).getFullYear()}
                                            </td>
                                            <td>{booking.bookingAt}</td>

                                            <>
                                                {booking.bookingStatus === 0 ?
                                                    <td><span style={{ color: "green" }}>Success</span></td> : null
                                                }
                                                {booking.bookingStatus === 1 ?
                                                    <td><Button color="warning" onClick={() => handleConfirm(booking)}>Confirm</Button></td> : null
                                                }
                                                {booking.bookingStatus === 2 ?
                                                    <td>
                                                        <UncontrolledTooltip
                                                            placement="top"
                                                            target="UncontrolledTooltipExample"
                                                        >
                                                            Delete this order?
                                                        </UncontrolledTooltip>
                                                        <span style={{ color: "red" }}>Cancel <FontAwesomeIcon id="UncontrolledTooltipExample" onClick={() => handleDelete(booking)} icon={faTrashCan} /></span>
                                                    </td> : null

                                                }

                                            </>
                                        </tr>

                                    )}
                                </tbody>
                            </Table >
                        </Row>
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Nothing to display</div>
                    }
                </Container>
                )
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>
            }
        </div>
    )
}
export default BookingOrder;