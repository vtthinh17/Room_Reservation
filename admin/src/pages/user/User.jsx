import React from "react";
// import './layout.css';
import { Container, Row, Table,Button } from 'reactstrap';
const User = () => {
    return (
        <>
            <div className="User">
                <Container>
                    <h2 className="text-center">User list</h2>
                    <Row>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>UserID</th>
                                    <th>UserName</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>                                  
                                </tr >
                            </thead >
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>54343jdsayruweqwds</td>
                                    <td>user</td>
                                    <td>Vuong Truong Thinh</td>                                 
                                    <td>abc@gmail.com</td>
                                    <td>123 Ninh Kieu, Can Tho</td>
                                    <td>034 123 432</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="warning" outline>Edit</Button>
                                        {/* if status == 1 */}
                                        <Button color="danger" outline>Delete</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>3</th>
                                    <td>r213dhfsa$a2</td>
                                    <td>thuan123</td>
                                    <td>My Thuan</td>
                                    <td>abc@gmail.com</td>
                                    <td>123 Ninh Kieu, Can Tho</td>
                                    <td>034 123 432</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="warning" outline>Edit</Button>
                                        {/* if status == 1 */}
                                        <Button color="danger" outline>Delete</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <th>2</th>
                                    <td>ha23ds$ds#ldsf</td>
                                    <td>test123</td>
                                    <td>Nguyen Van A</td>
                                    <td>abc@gmail.com</td>
                                    <td>123 Ninh Kieu, Can Tho</td>
                                    <td>034 123 432</td>
                                    <td>
                                        {/* if status == 0 */}
                                        <Button color="warning" outline>Edit</Button>
                                        {/* if status == 1 */}
                                        <Button color="danger" outline>Delete</Button>
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
export default User;