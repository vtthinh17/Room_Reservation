import { React, useContext,useEffect,useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Row, Table,Button } from 'reactstrap';
import useFetch from "../../hooks/useFetch";
import instance from "../../service";
// import User from "../user/User";
const Feedback = () => {
    const { user, dispatch } = useContext(AuthContext);
    const  dataFeedback = useFetch("/feedbacks/getAll")
    const [data, setData] = useState([])
    useEffect(() => {
        setData(dataFeedback.data);
      },
    [dataFeedback.data]);
    const toggleDisplay = async (feedback) =>{
        // await instance.put("/feedbacks/update/"+feedbackid,{isDisplay:!isDisplay});
        console.log(feedback)
    }
    return (
            <div className="Feedback">
               {user
               ?( <Container>
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
                            </tr >
                        </thead >
                        <tbody>
                        {data.map((feedback, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{feedback.userId}</td>
                                        <td>{feedback.content}</td>
                                        <td>{feedback.rating}/5</td>
                                        <td>{feedback.writingAt}</td>                                   
                                            {feedback.isDisplay === true ?
                                                <td><Button color="warning" onClick={()=>toggleDisplay(feedback)}>Hide</Button></td> 
                                                :<td><Button color="success" onClick={()=>toggleDisplay(feedback)}>Display</Button></td>
                                            }       
                                    </tr>
                                )}                      
                        </tbody>
                    </Table >
                </Row>
            </Container>)
                    : <div style={{display:"flex",alignItems:"center",justifyContent:"center", fontSize:"40px", height:"100vh", color:"red"} }>You need to login first!</div>
            }
            </div>
        
    )
}
export default Feedback;