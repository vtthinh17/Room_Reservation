import React from 'react';
import { Button } from 'reactstrap';
import '../login/form.css'
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

const Register = () => {
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("onclick signup => let get data from form and add into DB")
        // check account valid & navigate to Home or Admin Dasboard............
    }

    return (
        <div className="form__container">
            <h2 className="fw-bold mt-2 text-center">Register</h2>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='Confirm password' />
                <Button className="mb-4" onClick={handleSignUp}>Sign up</Button>

            </MDBContainer>
        </div>

    );
}

export default Register;
