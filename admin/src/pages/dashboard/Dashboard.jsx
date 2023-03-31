import { React, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget from "../../components/widget/Widget";
import './dashboard.css'
import income from '../../assets/images/money-bag.png'
import { format } from 'date-fns';
import { faUser, faCommentDots, faHouseUser, faFileInvoiceDollar, faCalendarCheck, faFileCircleCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CanvasJSChart } from 'canvasjs-react-charts';
import useFetch from "../../hooks/useFetch";
const Dashboard = () => {
    const { user, dispatch } = useContext(AuthContext);
    const dataFeedback = useFetch("/feedbacks/getAll")
    const dataUser = useFetch("/users/")
    const dataRoom = useFetch("/rooms/")
    const dataBookingOrder = useFetch("/booking/")
    const countNotifyOrder = dataBookingOrder.data.filter(element => element.bookingStatus === 1)
    const countNotifyFeedback = dataFeedback.data.filter(element => element.isDisplay === false)
    var revenue=0;
    dataBookingOrder.data.filter(element => element.bookingStatus === 2?revenue+=element.totalPrice : 0)
    const options = {
        animationEnabled: true,
        title: {
            text: "Number of customers visit in 2022-2023"
        },
        axisY: {
            title: "Number of Customers"
        },
        toolTip: {
            shared: true
        },
        data: [{
            name: "2022",
            type: "spline",
            showInLegend: true,
            dataPoints: [
                { y: 140, label: "Jan" },
                { y: 150, label: "Feb" },
                { y: 123, label: "Mar" },
                { y: 156, label: "Apr" },
                { y: 133, label: "May" },
                { y: 109, label: "Jun" },
                { y: 97, label: "Jul" },
                { y: 149, label: "Aug" },
                { y: 153, label: "Sept" },
                { y: 158, label: "Oct" },
                { y: 154, label: "Nov" },
                { y: 150, label: "Dec" }
            ]
        },
        {
            type: "spline",
            name: "2023",
            showInLegend: true,
            dataPoints: [
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 146, label: "Mar" },
                { y: 167, label: "Apr" },
                { y: 132, label: "May" },
                { y: 130, label: "Jun" },
                { y: 135, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" }
            ]
        }]
    }
    const checkIncomeTime = new Date()
    const handleConfirm = () => {
        // navigate('/type')
    }
    return (
        <div>
            {user ?
                <Container className="Dashboard">
                       {dataFeedback.data.length>0 && dataUser.data.length>0 && dataRoom.data.length>0? 
                       <div>
                        <Row>
                            <Link to='/rooms' className="widget_links col-3"><Widget type="Room" backgroundColor="#b3c6ff" icon={faHouseUser} countItem={dataRoom.data.length} /></Link>
                            <Link to='/feedback' className="widget_links col-3"><Widget type="Feedback" backgroundColor="#99ffd6" icon={faCommentDots} countItem={dataFeedback.data.length} /></Link>
                            <Link to='/user' className="widget_links col-3"><Widget type="User" backgroundColor="#ffe6b3" icon={faUser} countItem={dataUser.data.length} /></Link>
                            <Link to='/bookingorder' className="widget_links col-3"><Widget type="Booking" backgroundColor="#ffb3b3" icon={faFileInvoiceDollar} countItem={dataBookingOrder.data.length} /></Link>
                        </Row>
                        <div>
                            <div className="title">Notify</div>
                            <div className="news">
                                <Row>
                                    {/* go to confirm Order */}
                                    <div className="col-8">
                                        <div className="confirmNotify">
                                            <div className="confirmNotify_number">{countNotifyOrder.length}</div>
                                            <div className="confirmNotify_message">Order waiting confirm</div>
                                            <div onClick={handleConfirm} className="confirmNotify_approve">
                                                Approve now
                                                <span className="approveIcon">
                                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="confirmNotify">
                                            <div className="confirmNotify_number">{countNotifyFeedback.length}</div>
                                            <div className="confirmNotify_message">Feedback waiting confirm</div>
                                            <div onClick={handleConfirm} className="confirmNotify_approve">
                                                Approve now
                                                <span className="approveIcon">
                                                    <FontAwesomeIcon icon={faFileCircleCheck} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 income">
                                        <div className="title">Revenue</div>
                                        <img src={income} alt="" />
                                        <div>
                                            <FontAwesomeIcon icon={faDollarSign} />
                                            <span className="totalIncome">{revenue}</span>
                                        </div>
                                        <div style={{ fontWeight: "300", fontSize: "18px" }}>Latest check: {format(checkIncomeTime, "hh:mm dd/MM/yyyy")}</div>
                                    </div>
                                </Row>
                            </div>
                        </div>
                        <div>
                            <div className="title">Statistics Chart</div>
                            <CanvasJSChart options={options}
                            /* onRef={ref => this.chart = ref} */
                            />
                        </div>
                       </div>
                       :<div className="spinner" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh" }}>Loading data...</div>
                       }
                </Container>
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>
            }
        </div>
    )
}
export default Dashboard;
// ----------------------------
