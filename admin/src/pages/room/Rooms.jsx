import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './rooms.css'
import { Container, Row, Table, Button, Input, FormGroup, Label, Form } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit, faTrashCan, faPlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from "../../service";
import Select from 'react-select';
const Rooms = () => {
    const { user, dispatch } = useContext(AuthContext);
    const { data, reFetch } = useFetch("/rooms/")
    const [dataRoom, setDataRoom] = useState({})
    useEffect(() => {
        setDataRoom(data);
    }, [data]);
    const [choosenRoom, setChoosenRoom] = useState({});
    // edit
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };
    const handleClick = (room) => {
        toggle()
        setChoosenRoom(room)
    }
    const [roomType, setRoomType] = useState(choosenRoom.roomType ? choosenRoom.roomType : 1);
    const handleSelectRoomType = (type) => {
        setRoomType(type)
        // console.log('state Romm Type', roomType)
    }
    const [editRoom, setEditRoom] = useState({});
    const handleChange = (e) => {
        setEditRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(editRoom)
    };
    const handleEditRoom = async (e) => {
        e.preventDefault();
        console.log({ ...editRoom, roomType: roomType })
        try {
            await instance.put('/rooms/update/' + choosenRoom._id, { ...editRoom, roomType: roomType })
            reFetch()
            toggleAll()
            // toggle()
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (room) => {
        console.log(room)
        if (window.confirm('Do you want to delete this room?') === true) {
            try {
                await instance.delete('/rooms/delete/' + room._id)
                // console.log("delete room")
                reFetch()
               
            } catch (error) {
                console.log(error)
            }
          } else {
            
          }
       
    }
   
    // const str='thinh, vuong,    truong'
    // console.log(str.split(",").map((item)=> item.trim()));

    const roomOptions = [
        { value: 1, label: 'Single' },
        { value: 2, label: 'Couple' },
        { value: 3, label: 'Family' },
    ];
    // const [modalAdd, setModalAdd] = useState(false);
    // const toggleAdd = () => setModalAdd(!modalAdd);
    return (
        <>
            <div className="Rooms">
                {user ? (<Container>
                    {dataRoom.length > 0 ? <Row>
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
                                    <th><Button color="primary">Add room <FontAwesomeIcon onClick={()=>{}} icon={faPlus} /></Button></th>
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
                                            <FontAwesomeIcon onClick={() => handleDelete(room)} icon={faTrashCan} />
                                        </td>
                                    </tr>
                                    // modal

                                )}
                            </tbody>
                        </Table >
                        {/* modal edit */}
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader>Edit room {choosenRoom.roomNumber}</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="image">
                                            Image URL
                                        </Label>
                                        <Input
                                            onChange={handleChange}
                                            id="image"
                                            name="image"
                                            placeholder='Paste new image URL here'
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="price">
                                            Price
                                        </Label>
                                        <Input
                                            onChange={handleChange}
                                            id="price"
                                            name="price"
                                            placeholder={choosenRoom.price}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="services">
                                            Services
                                        </Label>
                                        <Input
                                            onChange={handleChange}
                                            id="description"
                                            name="description"
                                            placeholder="Add new room service"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="roomType">
                                            Room type
                                        </Label>
                                        <Select

                                            placeholder='Select room type'
                                            value={roomOptions.value}
                                            onChange={e => handleSelectRoomType(e.value)}
                                            options={roomOptions}
                                            className='roomTypeInput'
                                        />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleEditRoom}>
                                    Save
                                </Button>
                                <Modal
                                    isOpen={nestedModal}
                                    toggle={toggleNested}
                                    onClosed={closeAll ? toggle : undefined}
                                >
                                    <ModalHeader><FontAwesomeIcon icon={faCircleCheck} /></ModalHeader>
                                    <ModalBody className="text-center" style={{fontSize:"28px"}}>Edit room success!</ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={toggleAll}>
                                            Ok
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                <Button onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
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