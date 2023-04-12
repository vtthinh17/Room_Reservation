import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './user.css'
import instance from "../../service";
const User = () => {

    const { user, dispatch } = useContext(AuthContext);
    const { data, reFetch } = useFetch("/users/")
    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        setDataUser(data);
    },
        [data]);
    const [modal, setModal] = useState(false);
    const [choosenUser, setChoosenUser] = useState({});
    const toggle = () => setModal(!modal);
    const handleClick = (user) => {
        toggle()
        setChoosenUser(user)
    }
    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?') === true) {
            try {
                await instance.delete("/users/" + choosenUser._id);
                toggle()
                reFetch();
               } catch (error) {
                
               }
        } else {

        }
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
                                {dataUser.map((user, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user._id}</td>
                                        <td>{user.userName}</td>
                                        {user.fullName ? <td>{user.fullName}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.email ? <td>{user.email}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.address ? <td>{user.address}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        {user.phone ? <td>{user.phone}</td> : <td style={{ textAlign: "center" }}>...</td>}
                                        <td>
                                            <FontAwesomeIcon id='UncontrolledTooltipExample' onClick={() => handleClick(user)} icon={faTrashCan} />
                                            <UncontrolledTooltip
                                                    placement="top"
                                                    target="UncontrolledTooltipExample"
                                                >
                                                    Delete this user ?
                                                </UncontrolledTooltip>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Cofirm delete</ModalHeader>
                                <ModalBody>
                                Do you want to delete this user?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={handleDelete}>
                                        Delete
                                    </Button>{' '}
                                    <Button color="secondary" onClick={toggle}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </Table >
                    </Row>
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Loading data...</div>

                    }

                </Container>)
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>
            }
        </div>
    )
}
export default User;