import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table, Button, UncontrolledTooltip } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
import './feedback.css'
import { faEye, faEyeSlash, faTractor, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Feedback = () => {
    const { user, dispatch } = useContext(AuthContext);
    const { data, reFetch } = useFetch("/feedbacks/getAll")
    const [dataFeedback, setDataFeedback] = useState([])
    useEffect(() => {
        setDataFeedback(data);
    },
        [data]);
    const toggleDisplay = async (feedback) => {
        await instance.put("/feedbacks/update/" + feedback._id, { isDisplay: !feedback.isDisplay });
        reFetch();
    }
    const handleDelete = async (selectedFeedback) => {
        if (window.confirm('Do you want to delete this room?') === true) {
            try {
                await instance.delete("/feedbacks/delete/" + selectedFeedback._id);
                reFetch();
            } catch (error) {
            }
        } else {

        }
    }
    return (
        <div className="Feedback">
            {user
                ? (<Container>
                    <h2 className="text-center">Feedback list</h2>
                    <Row>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Author</th>
                                    <th>Feedback content</th>
                                    <th>Rating</th>
                                    <th>Time submit</th>
                                    <th>Display status</th>
                                    <th></th>
                                </tr >
                            </thead >
                            <tbody>
                                {dataFeedback.map((feedback, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{feedback.userId}</td>
                                        <td className="feedbackContent">{feedback.content}</td>
                                        <td>{feedback.rating}/5</td>
                                        <td>{feedback.writingAt}</td>
                                        {feedback.isDisplay === true ?
                                            <td><Button color="warning" outline onClick={() => toggleDisplay(feedback)}>Hide<FontAwesomeIcon icon={faEyeSlash} /></Button></td>
                                            : <td><Button color="success" onClick={() => toggleDisplay(feedback)}>Display<FontAwesomeIcon icon={faEye} /></Button></td>
                                        }
                                        <td>
                                            <FontAwesomeIcon id='UncontrolledTooltipExample' onClick={() => handleDelete(feedback)} icon={faTrashCan} />
                                            <UncontrolledTooltip
                                                placement="top"
                                                target="UncontrolledTooltipExample"
                                            >
                                                Delete this feedback?
                                            </UncontrolledTooltip>
                                        </td>
                                    </tr>

                                )}
                            </tbody>
                        </Table >
                    </Row>
                </Container>)
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", height: "100vh", color: "grey" }}>You need to login first!</div>
            }
        </div>

    )
}
export default Feedback;