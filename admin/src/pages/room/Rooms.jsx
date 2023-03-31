import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './rooms.css'
import { Container, Row, Table, Button } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from "../../service";
const Rooms = () => {
    const { user, dispatch } = useContext(AuthContext);
    const dataRoom = useFetch("/rooms/")
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dataRoom.data);
    }, [dataRoom.data]);
    const [choosenRoom, setChoosenRoom] = useState({});
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); 
    const handleClick = (room) => {
        toggle()
        setChoosenRoom(room)
    }
    const handleEditRoom = async() => {
        console.log("edit room")
        // await instance.put('/rooms/update'+choosenRoom.id,dataUpdate)
        toggle()
    }
    // const [modalAdd, setModalAdd] = useState(false);
    // const toggleAdd = () => setModalAdd(!modalAdd);
    return (
        <>
            <div className="Rooms">

                {user ? (<Container>

                    {data.length > 0 ? <Row>
                        <h2 className="text-center">Rooms list</h2>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Room number</th>
                                    <th>Image</th>
                                    <th>Room Type</th>
                                    <th>Price</th>
                                    <th>Room services</th>
                                    <th><Button color="primary">Add room <FontAwesomeIcon onClick={() => {}} icon={faPlus} /></Button></th>
                                </tr >
                            </thead >
                            <tbody>
                                {data.map((room, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{room.roomNumber}</td>
                                        <td><img src={room.image} alt="" className="roomImage" /></td>
                                        {room.roomType === 1 ? <td>Single</td> : null}
                                        {room.roomType === 2 ? <td>Couple</td> : null}
                                        {room.roomType === 3 ? <td>Family</td> : null}
                                        <td>{room.price}$</td>
                                        <td>
                                            <ul>
                                                {room.description.map((element, index) =>
                                                    <li key={index}>&#10003; {element}</li>
                                                )}
                                            </ul>
                                        </td>
                                        <td>
                                            <FontAwesomeIcon onClick={() => handleClick(room)} icon={faEdit} />
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </td>
                                    </tr>
                                    // modal

                                )}
                            </tbody>
                        </Table >
                        {/* modal edit */}
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader>Edit room</ModalHeader>
                            <ModalBody>
                                <div className="form">
                                    <label htmlFor="">Room Number</label>
                                    <input type="text" placeholder={choosenRoom.roomNumber} />
                                    <br />
                                    <label htmlFor="">Room Type</label>
                                    <input type="text" placeholder={choosenRoom.roomType} />
                                    <br />
                                    <label htmlFor="">Price</label>
                                    <input type="text" placeholder={choosenRoom.price} />
                                    <br />
                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder="New url..." />
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleEditRoom}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {/* modal add */}
                        {/* <Modal isOpen={modalAdd} toggle={toggleAdd}>
                            <ModalHeader>Add room</ModalHeader>
                            <ModalBody>
                                <div className="form">
                                    <label htmlFor="">Room Number</label>
                                    <input type="text" placeholder="" />
                                    <br />
                                    <label htmlFor="">Room Type</label>
                                    <input type="text" placeholder="" />
                                    <br />
                                    <label htmlFor="">Price</label>
                                    <input type="text" placeholder="" />
                                    <br />
                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder="New url..." />
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleEditRoom}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </Modal> */}
                    </Row>
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Loading data...</div>
                    }
                </Container>)
                    : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>

                }
            </div>
        </>
    )
}
export default Rooms;