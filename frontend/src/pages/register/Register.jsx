import { Button } from 'reactstrap';
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login/form.css'
import { MDBContainer, MDBInput, } from 'mdb-react-ui-kit';
import instance from "../../service/index.js"
const Register = () => {
    const [data, setData] = useState({
        userName: '',
        passWord: '',
        phone: '',
        email:''
        // cfpassWord: ''
    });
    let errorMessage = ''
    const navigate = useNavigate()
    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(data)
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("sent this data to server>>>", data)
        try {           
            await instance.post("/auth/register", data);
            alert("register success!!!")         
            navigate("/login")
        } catch (err) {
            errorMessage='register failed'
            console.log(err)
        }
    }

    return (
        <div className="form__container">
            <h2 className="fw-bold mt-2 text-center">Register</h2>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Username' id='userName' type='text' />
                <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Password' id='passWord' type='password' />
                <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Email' id='email' type='text' />
                <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Phone Number' id='phone' type='text' />
                {/* <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Confirm password' id='cfpassWord' type='password' /> */}
                <Button className="mb-4" onClick={handleSignUp}>Sign up</Button>
                <span className='text-center' style={{ color: "red" }}>{errorMessage}</span>
            </MDBContainer>

        </div>

    );
}

export default Register;
