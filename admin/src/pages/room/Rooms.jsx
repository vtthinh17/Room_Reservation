import React from "react";
import './rooms.css'
import { Container, Row, Table, Button } from 'reactstrap';
const Rooms = () => {
    return (
        <>
            <div className="Rooms">
                <Container>
                    <h2 className="text-center">Rooms list</h2>
                    <Row>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>RoomID</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Room services</th>
                                    <th>Booking Status</th>
                                    <th></th>
                                </tr >
                            </thead >
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>
                                        <img src="https://img.freepik.com/free-photo/yellow-living-room-interior-with-free-space_43614-934.jpg?w=740&t=st=1679897032~exp=1679897632~hmac=d8eb2e4b2694b11df27411ec8a494a13b7f83be3d5b1ead7aeff7db0cce0be02" className="roomImage" alt="" />
                                    </td>
                                    <td>100$</td>
                                    <td>
                                        <ul>
                                            <li>1 person</li>
                                            <li>Wifi</li>
                                            <li>Drinks</li>
                                        </ul>
                                    </td>
                                    <td>
                                        {/* if status == 0 */}
                                        <span className="bookingStatus bookingStatus_success">Success</span>
                                    </td>
                                    <td>
                                        <Button color="warning">Edit</Button>
                                        <Button color="danger">Delete</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>2</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>
                                        <img src="https://img.freepik.com/free-photo/yellow-living-room-interior-with-free-space_43614-934.jpg?w=740&t=st=1679897032~exp=1679897632~hmac=d8eb2e4b2694b11df27411ec8a494a13b7f83be3d5b1ead7aeff7db0cce0be02" className="roomImage" alt="" />
                                    </td>
                                    <td>250$</td>
                                    <td>
                                        <ul>
                                            <li>1 person</li>
                                            <li>Wifi</li>
                                            <li>Drinks</li>
                                        </ul>
                                    </td>
                                    <td>
                                        {/* if status == 1 */}
                                        <Button color="warning" outline>Confirm</Button>
                                    </td>
                                    <td>
                                        <Button color="warning">Edit</Button>
                                        <Button color="danger">Delete</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        63jdysd2#dsdgtyes
                                    </td>
                                    <td>
                                        <img src="https://img.freepik.com/free-photo/yellow-living-room-interior-with-free-space_43614-934.jpg?w=740&t=st=1679897032~exp=1679897632~hmac=d8eb2e4b2694b11df27411ec8a494a13b7f83be3d5b1ead7aeff7db0cce0be02" className="roomImage" alt="" />
                                    </td>
                                    <td>600$</td>
                                    <td>
                                        <ul>
                                            <li>1 person</li>
                                            <li>Wifi</li>
                                            <li>Drinks</li>
                                        </ul>
                                    </td>
                                    <td>
                                        {/* if status == 0 */}
                                        <span className="bookingStatus bookingStatus_cancel">Cancel</span>
                                    </td>
                                    <td>
                                        <Button color="warning">Edit</Button>
                                        <Button color="danger">Delete</Button>
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
export default Rooms;