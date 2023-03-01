import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./feedback.css";
import { Container,Row } from 'reactstrap';
import logo from './../../assets/images/feedback1.jpg';


function Feedback() {
    const [value, setValue] = useState('');

    return (
        <>
            <Container className='feedback'>
                <Row>
                    <h1 className='text-center page-title'>We're value your feedback!</h1>
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
  It has survived not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. 
                    </p>
                </Row>
                <hr />
                <Row>
                    <div className="col-6">

                        <img src={logo} alt="" />
                    </div>
                    <div className="col-6">
                        <h1>Writing here</h1>
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                    </div>
                </Row>
            </Container>
        </>
    );
}
export default Feedback