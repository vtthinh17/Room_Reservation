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

import useFetch from "../../hooks/useFetch";
const Reservations = () => {
    const { data, loading, error } = useFetch("/rooms/getRoomByQuery?roomNumber=101")
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
            thang: date[0].startDate.getMonth() + 1
        })
    }
    const getRoomDetails = () => {
        console.log('click booking room number: {room.number}')

    }
    // fake data
    // const images = [room1, room2, room3, room4]
    // const rooms = [
    //     {
    //         roomType: 0,
    //         roomNumber: 101,
    //         description: ["Only 1 person", "Full amenities","Free wifi"],
    //         price: 30,
    //         status: 0,
    //         dateServe: [],
    //         image: images[0]
    //     },
    //     {
    //         roomType: 1,
    //         roomNumber: 102,
    //         description: ["Best choice for couple","Drinks","Beautiful view"],
    //         price: 50,
    //         status: 0,
    //         dateServe: [],
    //         image: images[1],
    //     },
    //     {
    //         roomType: 2,
    //         roomNumber: 103,
    //         description: ["Suit for 2-3 person or small family","Snacks","Tivi for kids"],
    //         price: 100,
    //         status: 0,
    //         dateServe: [],
    //         image: images[2],
    //     }
    // ]

    return (

        <div className="reservation">
            <div className="booking_bonus">
                <h4>Rooms</h4>
                <p>We supply all type of rooms from standard to luxury.
                    Simply just pick your date, we will show the rooms that available for you.
                </p>
            </div>
            {
                loading
                    ? ("loading")
                    : (
                        <>  {console.log(">>>data:", data)}
                            {console.log(">>>loading:", loading)}
                            {console.log(">>>error:", error)}

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

                                {data 
                                ? <div className="row list_room ">
                                    {data.map((room) => (
                                        <div className="col-4 list_room-items" key={room._id}>
                                            {console.log(room)}
                                            <img src={room.image} alt="" />
                                            <ul className="list_room-items--description">
                                                <li className="text-center"><b>Room {room.roomNumber}</b></li>
                                                {room.description.map((element, index) =>
                                                    <li key={index}>&#10003; {element}</li>
                                                )}
                                            </ul>
                                            <span className="price">Price: {room.price}$/days</span>
                                            <Link to='/booking/:room.id'>
                                                <button className="list_room-items--button" onClick={getRoomDetails}>Booking</button>
                                            </Link>
                                        </div>
                                    ))}
                                </div> 
                                : <h3 style={{color: "red"}}>There is no room</h3>}

                            </div>
                        </>
                    )
            }



        </div >

    )

}
export default Reservations;