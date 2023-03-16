import React, { useState } from "react";
import './bookinghistory.css'
import instance from "../../service";
import { Container, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faCircleXmark,faTrashCan } from '@fortawesome/free-solid-svg-icons';
const BookingHistory = () => {
    // const { data, loading, error,reFetch } = useFetch("/orders/getAll/");
    const [order,setOrder]=useState([])
    const handleCancleOrder = async ()=>{
        if (window.confirm("Do you sure to cancel this order?")) {
            try {
                // await instance.post("/order/delete/:id");
                // refect de lay lai danh sach Order List va render lai giao dien sau khi xoa
                // reFetch();
                // setOrder(order)
                console.log("Delete order success")
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log("Undo cancel order,nothing change ")
        }
    }
    return (
        <Container>
            <h3 className="text-center mb-3 mt-3">Booking history</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>BookingID</th>
                        {/* <th>Room Number</th> */}
                        <th>Dates</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>6409966dd3fbeef293548bd0</td>
                        {/* <td>101</td> */}
                        {/* {date[0].start} - {date[0].end}*/}
                        <td>23/07/2023 - 02/09/2023</td>
                        {/* {bookingsList.map(item,index)=>{
                            switch(item.status){
                                case 0: return <td><FontAwesomeIcon icon={faCircleXmark}/>Cancel</td>;
                                case 1: return <td>Pending confirm... you can cancel this order<FontAwesomeIcon onclick={()=>{}} icon={faTrashCan}/>   
                                case 2: return <td><FontAwesomeIcon icon={faCircleXmark}/>Done</td>;
                            }   
                        }} */}
                        <td>20 x 7 = 140$</td>
                        <td>Done</td> 
                        <td><FontAwesomeIcon icon={faCircleCheck}/></td>                      
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>6409966dd3fbeef293548bd0</td>
                        {/* <td>105</td> */}
                        <td>23/07/2023 - 02/09/2023</td>
                        <td>20 x 7 = 140$</td>
                        <td>Pending confirm ={'>'} you still able to cancel this order</td>
                        <td><FontAwesomeIcon onClick={handleCancleOrder} icon={faTrashCan}/></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>6409966dd3fbeef293548bd0</td>
                        {/* <td>103</td> */}
                        <td>23/07/2023 - 02/09/2023</td>
                        {/* {room.price} x (booking.date_end - booking.date_start) = {booking.total_price} */}
                        <td>20 x 7 = 140$</td>
                        <td>Cancel</td>
                        <td><FontAwesomeIcon icon={faCircleXmark}/></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}
export default BookingHistory;