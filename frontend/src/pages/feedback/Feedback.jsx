import React, { useState, useContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import "./feedback.css";
import { Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import instance from "../../service";
import { AuthContext } from "../../contexts/AuthContext";
import avatar from './../../assets/images/anonymous_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import useFetch from "../../hooks/useFetch";
import { format } from 'date-fns';
function Feedback() {
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [rating, setRating] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const { user } = useContext(AuthContext)
    const [feedback, setFeedback] = useState({
        userId: user._id,
        content: '',
        rating: rating,
        writingAt: format(new Date(), "hh:mm dd/MM/yyyy")
    });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [msgError, setMsgError] = useState(false);
    const handleChange = (e) => {
        setFeedback((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(feedback)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsgError(false)  
        try {
            await instance.post("/feedbacks/", { ...feedback, rating: rating,writingAt: format(new Date(), "hh:mm dd/MM/yyyy") });
            console.log("Insert new feedback into database success!!! >>>", { ...feedback, rating: rating })
            toggle()
        } catch (err) {
            setMsgError(true)
            console.log(err)
        }
    }
    const { data, loading, error } = useFetch("/feedbacks/")

    return (

        <Container className='feedback'>
            {
                loading
                    ? (<h3 className='text-center'>Loading data...</h3>)
                    : (<>
                        {console.log(">>>fetch Feedback data:", data)}
                        <Container>
                            <h1 className='text-center page-title'>Some feedback from our customers</h1>
                            {data ?
                                <div className="post_lists">
                                    {data.map((feedback, index) =>
                                    (
                                        <Row className="post" key={index}>
                                            <div className="col-2">
                                                <img src={avatar} alt="" />
                                            </div>
                                            <div className="post_content col-8">
                                                <div>
                                                    <span className="post_content-userName">{feedback.userId}</span>
                                                    <span className="post_content-timePost">
                                                        at {feedback.writingAt}
                                                        {/* 6 hours ago */}
                                                    </span>
                                                </div>
                                                <div className="">
                                                    {feedback.content}
                                                </div>
                                            </div>
                                            <div className="post_content-rating col-2">
                                                <span style={{ fontWeight: 'lighter' }}>Rating: {feedback.rating}</span><FontAwesomeIcon icon={faStar} />
                                            </div>
                                        </Row>
                                    )
                                    )}
                                </div>
                                : <h3 style={{ color: "red" }}>There is no feedback</h3>
                            }
                        </Container>
                    </>)
            }
            <Row>
                <p className='text-center'>Hi <b>{user.userName}</b>, it would be great if you can give us some word about your experience here, we are value all you feedback!</p>
            </Row>
            <Row>
                <div className="col-6">
                </div>
                <div className="col-6">
                    <h1>Writing here</h1>
                    <div>
                        <textarea onChange={handleChange} id='content' cols="50" rows="5" placeholder='Type somthing...' spellCheck="false"></textarea>
                    </div>
                    <div className="rating_input">
                        How do you like our services?
                        <Box
                            sx={{
                                width: 180,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                id="rating"
                                name="rating"
                                value={rating}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {rating !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                            )}
                        </Box>
                        {msgError && <Row className='text-center' style={{ color: "red" }}>Please write something before submit</Row>}
                    </div>
                    <Button onClick={handleSubmit}>Submit</Button>
                  
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader><FontAwesomeIcon icon={faCircleCheck} /></ModalHeader>
                        <ModalBody>
                            <h2 className="text-center">Thank You!</h2>
                            <p className="text-center">Your comment has been recorded, we will approve it later. Once again, thank you!</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={toggle}>
                                OK
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Row>
        </Container>)
}
export default Feedback