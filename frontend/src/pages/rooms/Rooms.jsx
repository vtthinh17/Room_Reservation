import React, { useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import './rooms.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { addDays, format } from 'date-fns';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
const Reservations = () => {
    // const navigate = useNavigate()

    const { data, loading, error, reFetch } = useFetch("/rooms/");
    const [roomList, setRoomList] = useState([]);
    useEffect(() => {
        setRoomList(data);
    },
        [data]);
    // ----------Filter------------------
    const roomOptions = [
        { value: 0, label: 'All rooms' },
        { value: 1, label: 'Single' },
        { value: 2, label: 'Couple' },
        { value: 3, label: 'Family' },
    ];
    // -----------filter Room type-------------------
    const [roomType, setRoomType] = useState(0);
    const handleSelectRoomType = (type) => {
        console.log('Loai phong', type)
        setRoomType(type)
    }

    // ------------select date-------------------
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openDate, setOpenDate] = useState(false);

    // ----------------filter price------------------------
    // initstate = highest price de hien thi tat ca room
    const [priceFilter, setPriceFilter] = useState(500);
    const handleSelectPriceFilter = (e) => {
        console.log('Gia tien', e.target.value)
        setPriceFilter(e.target.value)
    }
    // search
    const getFilter = async () => {
        if(roomType!==0){
            const query = await instance.get(`/rooms/getRoomByQuery?roomType=${roomType}&max=${priceFilter}`)
            setRoomList(query.data);
        }else{
            const query = await instance.get(`/rooms/getRoomByQuery?max=${priceFilter}`)
            setRoomList(query.data);
        }
        
    }
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [choosenRoom, setChoosenRoom] = useState({});
    const toggle = () => setModal(!modal);
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };
    const [disableList, setDisableList] = useState([]);

    const handleConfirmBooking = async () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
        try {
            instance.post('/booking/create/', {
                roomID: choosenRoom._id,
                userID: JSON.parse(localStorage.getItem("user"))._id,
                dateServe: { startServe: date[0].startDate, endServe: date[0].endDate },
                totalPrice: choosenRoom.price * (getDates(date[0].startDate, date[0].endDate).length),
                bookingAt: new Date(),
            })
            instance.put('/rooms/addDateServe/' + choosenRoom._id, { startServe: date[0].startDate, endServe: date[0].endDate })
            reFetch()
        } catch (error) {
            console.log(error)
        }

    }

    function getDates(startDate, stopDate) {
        let dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(stopDate)) {
            dateArray.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    const handleClick = (room) => {
        setModal(!modal)
        setChoosenRoom(room)
        let disableDateList = [];
        room.dateServe.forEach(element => {

            disableDateList = disableDateList.concat(getDates(element.startServe, element.endServe));
        });
        setDisableList(disableDateList)
    }
    return (
        <div className="reservation">
            <div>
                <Modal isOpen={modal} >
                    <ModalHeader>Room {choosenRoom.roomNumber}</ModalHeader>
                    <div className="searchBar_date">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span onClick={() => setOpenDate(!openDate)}>Set your schedule: {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`} </span>
                        {openDate && <DateRange
                            minDate={new Date()}
                            disabledDates={disableList}
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='searchBar_calendar'
                            preventSnapRefocus={true}

                        />}
                    </div>
                    <ModalBody>
                        <div className="room_ifo row">
                            <div className="col-6">
                                <img src={choosenRoom.image} alt="" />
                            </div>
                            <div className="col-6">
                                <span className="text-center"><b>Room services:</b></span>
                                <ul className="list_room-items--description">
                                    {choosenRoom.description && choosenRoom.description.map((element, index) =>
                                        <li key={index}>&#10003; {element}</li>
                                    )}
                                </ul>
                                <span className="text-center">
                                    Price: {choosenRoom.price}$ x {getDates(date[0].startDate, date[0].endDate).length}
                                    = <b>{choosenRoom.price * getDates(date[0].startDate, date[0].endDate).length}</b>$
                                </span>
                            </div>
                        </div>
                        <Modal
                            isOpen={nestedModal}
                            onClosed={closeAll ? toggle : undefined}
                        >
                            <ModalHeader><FontAwesomeIcon icon={faCircleCheck} /></ModalHeader>
                            <ModalBody className="text-center">Your booking will be executed by admin later, before that time you can cancel your order in booking history site.</ModalBody>
                            <ModalFooter>
                                <Button onClick={toggleAll}>
                                    OK
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={handleConfirmBooking}>
                            Booking
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className="booking_bonus">
                <h4>Rooms</h4>
                <p>We supply all type of rooms from standard to luxury.
                    Simply just pick your date, we will show the rooms that available for you.
                </p>
            </div>
            {/* if have data show UI else show loading... */}
            {

                loading
                    ? (<h3 className='text-center'>Loading data...</h3>)
                    : (
                        <>
                            <div className="searchBar">
                                <h2 >Filter</h2>
                                {/* room type filter */}
                                <div className="searchBar_filter roomTypeFilter">
                                    <span>Type of room</span>
                                    <Select
                                        placeholder="Select..."
                                        value={roomOptions.value}
                                        onChange={e => handleSelectRoomType(e.value)}
                                        options={roomOptions}
                                        className='roomTypeInput'
                                    />
                                </div>
                                {/* price filter */}
                                <div className="searchBar_filter priceFilter">
                                    <span>Price limited: {priceFilter} $</span>
                                    <input
                                        placeholder="gia tien"
                                        type='range'
                                        onChange={e => handleSelectPriceFilter(e)}
                                        min={20}
                                        max={500}
                                        step={20}
                                        value={priceFilter}
                                        className='custom-slider'>
                                    </input>
                                </div>

                                <div>
                                    <button className="searchBar_button" onClick={getFilter}>Search</button>
                                </div>
                            </div>

                            <div className="container">
                                {roomList
                                    ?
                                    <div className="row list_room ">
                                        {roomList.map((room) => (
                                            <div className="col-4 list_room-items" key={room._id}>
                                                <img src={room.image} alt="" />
                                                <span className="price">Price: {room.price}$/days</span>
                                                <button className="list_room-items--button" onClick={() => handleClick(room)}>Booking</button>

                                            </div>
                                        ))}
                                    </div>
                                    : <h3 style={{ color: "red" }}>There is no room</h3>}

                            </div>
                        </>
                    )
            }
            {
                error && <div>Message from error: {error}</div>
            }
        </div >

    )

}
export default Reservations;