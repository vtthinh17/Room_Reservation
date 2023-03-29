import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './user.css'
const User = () => {
    const { user, dispatch } = useContext(AuthContext);
    const dataUser = useFetch("/users/")
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dataUser.data);
    },
        [dataUser.data]);
    const handleUpdate = async () => {
        // instance.update('/user/update'+user.Id)
        // refetch()
    }
    const handleDelete = async () => {
        // instance.delete('/user/delete'+user.Id)
        // refetch()
    }
    return (
        <div className="User">
            {user ?
                (<Container>
                    {data.length > 0 ? <Row>
                        <h2 className="text-center">User list</h2>
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
                                {data.map((user, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user._id}</td>
                                        <td>{user.userName}</td>
                                        {user.fullName ? <td>{user.fullName}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.email ? <td>{user.email}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.address ? <td>{user.address}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.phone ? <td>{user.phone}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        <td>
                                            <FontAwesomeIcon onClick={handleUpdate} icon={faEdit} />
                                            <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table >
                    </Row>
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Loading data...</div>

                    }

                </Container>)
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "red" }}>You need to login first!</div>
            }
        </div>
    )
}
export default User;