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
import { format } from 'date-fns';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
const Reservations = () => {
    // const navigate = useNavigate()
    
    const { data, loading, error } = useFetch("/rooms/");
    const [roomList, setRoomList] = useState([]);
    useEffect(() => {
        setRoomList(data);
      },
    [data]);
    // ----------Filter------------------
    const roomOptions = [
        { value: 1, label: 'Single' },
        { value: 2, label: 'Couple' },
        { value: 3, label: 'Family' },
    ];
    // -----------filter Room type-------------------
    const [roomType, setRoomType] = useState(1);
    const handleSelectRoomType = (type) => {
        console.log('Loai phong', type)
        setRoomType(type)
        // console.log('state Romm Type', roomType)
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
    const [priceFilter, setPriceFilter] = useState(400);
    const handleSelectPriceFilter = (e) => {
        console.log('Gia tien', e.target.value)
        setPriceFilter(e.target.value)
    }
    // search
    const getFilter = async() => {
        // const {query} = useFetch(`/rooms`);
        const query = await instance.get(`/rooms/getRoomByQuery?roomType=${roomType}&max=${priceFilter}`)
        console.log("list query:",query.data);
        setRoomList(query.data);
        // console.log({
        //     loaiPhong: roomType,
        //     giaTien: priceFilter,
        //     ngaybatdau: date[0].startDate.getDate(),
        //     ngayketthuc: date[0].endDate.getDate(),
        //     thang: date[0].startDate.getMonth() + 1
        // })
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

    const handleConfirmBooking = async () => {
        // check room date is available

        setNestedModal(!nestedModal);
        setCloseAll(false);
        // Tạo order mới => inser ngày đặt(date[0]) vào danh sách dateServe của phòng được chọn
        try {
            instance.post('/booking/create/', {
                roomID: choosenRoom._id,
                userID: JSON.parse(localStorage.getItem("user"))._id,
                dateServe: {startServe:format(date[0].startDate, "dd/MM/yyyy"),endServe:format(date[0].endDate, "dd/MM/yyyy")},
                totalPrice: choosenRoom.price * (date[0].endDate.getDate() - date[0].startDate.getDate() + 1),
                bookingAt: new Date(),
            })

            console.log("Insert new booking success!!!")
        } catch (error) {
            console.log("Insert new booking error:", error)
        }
    }
   
    const handleClick = (room) => {
        // toggle()
        setModal(!modal)
        setChoosenRoom(room)
   
        console.log("ngay dat: " + format(date[0].startDate, "dd/MM/yyyy") + format(date[0].endDate, " - dd/MM/yyyy"))
        console.log("cac ngay da duoc dat truoc cua phong duoc chon: ", room.dateServe)
        const pickDate = {start:Date.parse(date[0].startDate),end: Date.parse(date[0].endDate)}
        console.log(pickDate)
    }
    return (
        <div className="reservation">
            <div>
                {/* fetch data every render(model onclick => render => fetch data => many render(violation rule react limited render)) */}
                <Modal isOpen={modal} >
                    <ModalHeader>Room {choosenRoom.roomNumber}</ModalHeader>
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
                                    Price: {choosenRoom.price}$ x {(date[0].endDate.getDate() - date[0].startDate.getDate()) + 1}
                                    = <b>{choosenRoom.price * (date[0].endDate.getDate() - date[0].startDate.getDate() + 1)}</b>$
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
                        {/* xu ly  createOrderBooking  */}
                        <Button color="success" onClick={handleConfirmBooking}>
                            Booking
                        </Button>
                        <Button color="dark" onClick={toggle}>
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
                            {/* {console.log(">>>fetch Room datas:", data)} */}
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
                                        max={400}
                                        step={20}
                                        value={priceFilter}
                                        className='custom-slider'>
                                    </input>
                                </div>

                                <div className="searchBar_date">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <span onClick={() => setOpenDate(!openDate)}>Pick your days: {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`} </span>
                                    {openDate && <DateRange
                                        minDate={new Date()}
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className='searchBar_calendar'
                                        preventSnapRefocus={true}

                                    />}
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
            {/* if have error */}
            {
                error && <div>Message from error: {error}</div>
            }
        </div >

    )

}
export default Reservations;