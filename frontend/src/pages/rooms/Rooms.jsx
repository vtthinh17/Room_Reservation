import React from "react";
// import { Container, Row, UncontrolledCarousel, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import './rooms.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import room1 from './../../assets/images/room1.jpg';
import room2 from './../../assets/images/room2.jpg';
import room3 from './../../assets/images/room3.jpg';
import room4 from './../../assets/images/room4.jpg';
import room5 from './../../assets/images/room5.jpg';

const Reservations = () => {
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
    const getFilter = () => {
        // onclick search => truy van cac gia tri tu search bar(filter) => hien thi lai danh sach phong thoa dieu kien cua filter
        // select room where room.type=roomType,room.price<=priceFilter,status==0(available)
        console.log({
            loaiPhong: roomType,
            giaTien: priceFilter,
            ngaybatdau: date[0].startDate.getDate(),
            ngayketthuc: date[0].endDate.getDate(),
            thang:date[0].startDate.getMonth()+1
        })
    }
    const getRoomDetails = () => {
        console.log('click booking room number: {room.number}')

    }
    return (

        <div className="reservation">
            <div className="booking_bonus">
                <h4>Rooms</h4>
                <p>We supply all type of rooms from standard to luxury.
                    Simply just pick your date, we will show the rooms that available for you.
                </p>
            </div>

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

                <div className="row list_room ">
                    <div className="col-4 list_room-items">
                        <img src={room4} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 16$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <button className="list_room-items--button" onClick={getRoomDetails}>Booking</button>
                        </Link>
                    </div>
                    <div className="col-4 list_room-items">
                        <img src={room5} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 20$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <Link to='/booking/:room.id'>
                                <button className="list_room-items--button">Booking</button>
                            </Link>
                        </Link>
                    </div>
                    <div className="col-4 list_room-items">
                        <img src={room1} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 20$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <button className="list_room-items--button">Booking</button>
                        </Link>
                    </div>
                    <div className="col-4 list_room-items">
                        <img src={room3} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 20$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <button className="list_room-items--button">Booking</button>
                        </Link>
                    </div>
                    <div className="col-4 list_room-items">
                        <img src={room2} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 20$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <button className="list_room-items--button">Booking</button>
                        </Link>
                    </div>
                    <div className="col-4 list_room-items">
                        <img src={room4} alt="" />
                        <ul className="list_room-items--description">
                            <li className="text-center"><b>Room 201</b></li>
                            <li>&#10003; Suit for 2-3 person</li>
                            <li>&#10003; Full of amenities of our hotel</li>
                            <li className="price">Price: 20$/days</li>
                        </ul>
                        <Link to='/booking/:room.id'>
                            <button className="list_room-items--button">Booking</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div >

        // </>
    )
}
export default Reservations;