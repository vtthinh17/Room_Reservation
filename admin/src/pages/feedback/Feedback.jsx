import React from "react";
// import './layout.css';
import { Container, Row, Table,Button } from 'reactstrap';
const Feedback = () => {
    return (
        <>
            <div className="Feedback">
                <Container>
                    <h2 className="text-center">Feedback list</h2>
                    <Row>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Author</th>
                                    <th>Feedback content</th>
                                    <th>Rating</th>
                                    <th>Time submit</th>
                                    <th>Display status</th>                                  
                                </tr >
                            </thead >
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        Vuong Truong Thinh
                                    </td>
                                    <td>Very good, friendly staffs</td>
                                    <td>5/5</td>
                                    <td>23/07/2023</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="success" outline>Show</Button>
                                        {/* if status == 1 */}
                                        <Button color="warning" outline>Hide</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        thuan123
                                    </td>
                                    <td>Nice view, will be back next time!</td>
                                    <td>4/5</td>
                                    <td>05/10/2022</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="success" outline>Show</Button>
                                        {/* if status == 1 */}
                                        <Button color="warning" outline>Hide</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>2</th>
                                    <td>
                                        {/* user.FullName or user.userName */}
                                        user
                                    </td>
                                    <td>Good</td>
                                    <td>3.5/5</td>
                                    <td>05/10/2022</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="success" outline>Show</Button>
                                        {/* if status == 1 */}
                                        <Button color="warning" outline>Hide</Button>
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
export default Feedback;