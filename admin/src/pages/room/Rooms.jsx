import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './rooms.css'
import { Container, Row, Table, Button, Input, FormGroup, Label, Form, Col, UncontrolledTooltip, } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faEdit, faTrashCan, faPlus, faCircleCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from "../../service";
import Select from 'react-select';
import { toast } from 'react-toastify';
const Rooms = () => {
    const { user, dispatch } = useContext(AuthContext);
    const { data, reFetch } = useFetch("/rooms/")
    const [dataRoom, setDataRoom] = useState({});
    const [roomsv, setRoomsv] = useState([])
    const [choosenRoom, setChoosenRoom] = useState({});

    useEffect(() => {
        setDataRoom(data);
        let newData = data.find((item) => item._id === choosenRoom._id);
        if (newData) {
            setChoosenRoom(newData);
            setRoomsv(newData.description);
        }
    }, [data, choosenRoom, roomsv]);
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

    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);
    const [nestedModal1, setNestedModal1] = useState(false);
    const [closeAll1, setCloseAll1] = useState(false);

    const toggleNested1 = () => {
        setNestedModal1(!nestedModal1);
        setCloseAll1(false);
    };
    const toggleAll1 = () => {
        setNestedModal1(!nestedModal1);
        setCloseAll1(true);
    };

    const handleClick = (room) => {
        toggle()
        setChoosenRoom(room)
        setRoomsv(room.description)
    }
    const [roomType, setRoomType] = useState(choosenRoom.roomType ? choosenRoom.roomType : 1);
    const handleSelectRoomType = (type) => {
        setRoomType(type)
    }
    const [editRoom, setEditRoom] = useState({});
    const [newService, setNewService] = useState({});
    const handleChange = (e) => {
        setEditRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setNewService({ description: e.target.value })
        console.log(editRoom)
    };
    const [errorMsg, setErrorMsg] = useState('')
    const handleEditRoom = async (e) => {
        e.preventDefault();
        console.log({ ...editRoom, roomType: roomType })
        if (editRoom.roomNumber)
            try {
                await instance.put('/rooms/update/' + choosenRoom._id, { ...editRoom, roomType: roomType })
                reFetch()
                toggleAll()
            } catch (error) {
                console.log(error)
            }
    }
    const handleChangeService = (e) => {
        setNewService({ description: e.target.value })
        console.log(editRoom)
    };

    const handleChangeAdd = (e) => {
        setNewRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(newRoom)
    };

    const handleDelete = async (room) => {
        const roomOrders = await instance.get('/booking/roomID/' + room._id)
        let isAvailableForDelete = true
        let deleteList = []
        roomOrders.data.forEach(element => {
            if (element.bookingStatus === 0 || element.bookingStatus === 1) {
                // Neu co booking order phai phuc vu hoac chua xac nhan => Khong the xoa
                isAvailableForDelete = false
            } else {
                // Nguoc lai neu toan danh sach order bi huy(cancel) => them booking order vao list de xoa
                deleteList.push(element)
            }
        })


        if (isAvailableForDelete) {
            if (window.confirm('Do you want to delete this room?') === true) {
                try {
                    if (deleteList.length > 0) {
                        // delete booking order of this Room & delete Room
                        console.log("danh sach order se xoa cung phong", deleteList)
                        await instance.delete('/booking/deleteMany/', { data: deleteList })
                        await instance.delete('/rooms/delete/' + room._id)
                        reFetch()
                    } else {
                        // No booking order => delete Room only
                        await instance.delete('/rooms/delete/' + room._id)
                        // console.log("xoa phong")
                        reFetch()
                    }

                } catch (error) {
                    console.log(error)
                }
            } else {
                // Nothing to do
            }
        } else {
            alert(`Room is in serving status. Can't delete this room!`)
        }

    }
    const [newRoom, setNewRoom] = useState({
        roomNumber: 0,
        price: 0,
        image: '',
        description: ''
    })
    const toggleAdd = () => {
        setModal1(true)
    };
    const handleAdd = async () => {
        if (newRoom.roomNumber !== 0 && newRoom.price !== 0 && newRoom.image !== '' && newRoom.description !== '') {
            try {
                await instance.post('/rooms/create', { ...newRoom, roomType: roomType })
                toggleAll1()
                reFetch()
            } catch (error) {
                console.log(error)
                toast.error('Existed room number, please try another room number')

            }
        } else {
            toast.error('Please fill in all the fields')
        }
    };
    const handleAddService = async () => {
        try {
            await instance.put('/rooms/addNewService/' + choosenRoom._id, newService)
            reFetch()
        } catch (error) {

        }
    };
    const handleRemoveService = async (element) => {

        try {
            console.log(element)
            await instance.put('/rooms/removeService/' + choosenRoom._id, { data: element })

            reFetch()
        } catch (error) {
            console.log(error)
        }
    }
    const [addRoomMessage, setAddRoomMessage] = useState(false)
    const roomOptions = [
        { value: 1, label: 'Single' },
        { value: 2, label: 'Couple' },
        { value: 3, label: 'Family' },
    ];
    return (
        <>
            <div className="Rooms">
                {user ? (<Container>
                    {dataRoom.length > 0 ?
                        <Row>
                            <h2 className="text-center">Rooms list</h2>
                            {addRoomMessage &&
                                <div className="AddRoomSuccess-container">
                                    <div className="AddRoomSuccess">
                                        <h2 className="text-center" style={{ color: "green" }}>Add room success</h2>
                                        <Button color="success" onClick={() => setAddRoomMessage(false)}>Ok</Button>
                                    </div>
                                </div>}


                            <Modal isOpen={modal1} toggle={toggle1}>
                                <ModalHeader>Add room {choosenRoom.roomNumber}</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <h3 className="text-center">Add Room Form</h3>
                                        <Row>
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
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup className="">
                                                    <Label for="roomNumber">
                                                        Room Number
                                                    </Label>
                                                    <Input
                                                        onChange={handleChangeAdd}
                                                        id="roomNumber"
                                                        name="roomNumber"
                                                        placeholder="Enter room number..."
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="price">
                                                        Price
                                                    </Label>
                                                    <Input
                                                        onChange={handleChangeAdd}
                                                        id="price"
                                                        name="price"
                                                        placeholder="Room price..."
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <FormGroup>
                                                <Label for="image">
                                                    Room Image
                                                </Label>
                                                <Input
                                                    onChange={handleChangeAdd}
                                                    id="image"
                                                    name="image"
                                                    placeholder="Paste your room image URL"
                                                />
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <FormGroup>
                                                <Label for="description">
                                                    Room services
                                                </Label>
                                                <Input
                                                    onChange={handleChangeAdd}
                                                    id="description"
                                                    name="description"
                                                    placeholder="Room services..."
                                                />
                                            </FormGroup>
                                        </Row>

                                    </Form>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleAdd}>
                                        Save
                                    </Button>

                                    <Modal
                                        isOpen={nestedModal1}
                                        toggle={toggleNested1}
                                        onClosed={closeAll1 ? toggle1 : undefined}
                                    >
                                        <ModalHeader><FontAwesomeIcon icon={faCircleCheck} /></ModalHeader>
                                        <ModalBody className="text-center" style={{ fontSize: "28px" }}>Add room success!</ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={toggleAll1}>
                                                Ok
                                            </Button>
                                        </ModalFooter>

                                    </Modal>
                                    <Button onClick={toggle1}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>

                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Room number</th>
                                        <th>Image</th>
                                        <th>Room Type</th>
                                        <th>Price</th>
                                        <th>Room services</th>
                                        <th><Button color="primary" onClick={toggleAdd}>Add room <FontAwesomeIcon icon={faPlus} /></Button></th>
                                    </tr >
                                </thead >
                                <tbody>
                                    {data.map((room, index) =>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{room.roomNumber}</td>
                                            <td><img src={room.image} alt="Can't found image, please change others image URL" className="roomImage" /></td>
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
                                                <FontAwesomeIcon id='UncontrolledTooltipEdit' onClick={() => handleClick(room)} icon={faEdit} />
                                                <UncontrolledTooltip
                                                    placement="top"
                                                    target="UncontrolledTooltipEdit"
                                                >
                                                    Update room infomation
                                                </UncontrolledTooltip>
                                                <FontAwesomeIcon id='UncontrolledTooltipExample' onClick={() => handleDelete(room)} icon={faTrashCan} />
                                                <UncontrolledTooltip
                                                    placement="top"
                                                    target="UncontrolledTooltipExample"
                                                >
                                                    Delete this room?
                                                </UncontrolledTooltip>
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
                                        <Row>
                                            <Col md={6}>
                                                Current services:
                                                <br />
                                                {roomsv.map((element, index) =>
                                                    <ul key={index}>
                                                        <Row>
                                                            <Col md={10}><li>{element}</li></Col>
                                                            <Col md={2}><FontAwesomeIcon onClick={() => handleRemoveService(element)} icon={faSquareXmark} /></Col>
                                                        </Row>

                                                    </ul>
                                                )}
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="services">
                                                        Add new services
                                                    </Label>
                                                    <Input
                                                        onChange={handleChangeService}
                                                        id="description"
                                                        name="description"
                                                        placeholder="Add new room service"
                                                    />
                                                </FormGroup>
                                                <span className="nut" onClick={handleAddService}>Add <FontAwesomeIcon icon={faPlus} /> </span>
                                            </Col>
                                        </Row>
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
                                        <ModalBody className="text-center" style={{ fontSize: "28px" }}>Edit room success!</ModalBody>
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
                        : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "40px", height: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Nothing to display</span>
                            <div><Button color="primary" onClick={toggleAdd}>Add room <FontAwesomeIcon icon={faPlus} /></Button></div>
                            {addRoomMessage &&
                                <div className="AddRoomSuccess-container">
                                    <div className="AddRoomSuccess">
                                        <h2 className="text-center" style={{ color: "green" }}>Add room success</h2>
                                        <Button color="success" onClick={() => setAddRoomMessage(false)}>Ok</Button>
                                    </div>
                                </div>}
                            {/* Add room form */}
                            {/* {displayAddForm && */}
                            <div className="addform-container">
                                <Form className="addform">
                                    <h3 className="text-center">Add Room Form</h3>
                                    <Row>
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
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="">
                                                <Label for="roomNumber">
                                                    Room Number
                                                </Label>
                                                <Input
                                                    onChange={handleChangeAdd}
                                                    id="roomNumber"
                                                    name="roomNumber"
                                                    placeholder="Enter room number..."
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="price">
                                                    Price
                                                </Label>
                                                <Input
                                                    onChange={handleChangeAdd}
                                                    id="price"
                                                    name="price"
                                                    placeholder="Room price..."
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <FormGroup>
                                            <Label for="image">
                                                Room Image
                                            </Label>
                                            <Input
                                                onChange={handleChangeAdd}
                                                id="image"
                                                name="image"
                                                placeholder="Paste your room image URL"
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <FormGroup>
                                            <Label for="description">
                                                Room services
                                            </Label>
                                            <Input
                                                onChange={handleChangeAdd}
                                                id="description"
                                                name="description"
                                                placeholder="Room services..."
                                            />
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button color="primary" onClick={handleAdd}>
                                                Save
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button color="secondary" onClick={toggle1}>
                                                Cancel
                                            </Button>
                                        </Col>
                                        {errorMsg && <div style={{ color: "red" }}>Please fill in all the fields</div>}
                                    </Row>

                                </Form>
                            </div>
                            {/* } */}
                        </div>
                    }
                </Container>)
                    : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>

                }
            </div>
        </>
    )
}
export default Rooms;