import React from "react";
import { Container, Row, Table,Button } from 'reactstrap';
const BookingOrder = () => {
    return (
        <>
            <div className="BookingOrder">
                <Container>
                    <h2 className="text-center">Booking orders list</h2>
                    <Row>
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
                                <tr>
                                    <th>1</th>
                                    <td>
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>from 23/07/2023 to 26/07/2023</td>
                                    <td>100$</td>
                                    <td> 15:23:03 23/07/2023</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="success" disabled>Success</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>from 19/07/2023 to 21/07/2023</td>
                                    <td>100$</td>
                                    <td>07:21:05 05/10/2022</td>
                                    <td>
                                        {/* if status == 1 */}
                                        <Button color="warning" outline>Confirm</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>2</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>from 23/07/2023 to 23/07/2023</td>
                                    <td>3.100$</td>
                                    <td>18:32:23 05/10/2022</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="danger" disabled>Cancel</Button>
                                    </td>
                                </tr>


                            </tbody>
                        </Table >
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default BookingOrder;