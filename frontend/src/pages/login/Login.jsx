import React from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { Button } from 'reactstrap';
const Login = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("onclick login => call API verifyUser/Admin")
    // check account valid & navigate to Home or Admin Dasboard............
  }
  return (
    <div className="form__container">
       <h2 className="fw-bold mt-2 text-center">Sign in</h2>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />
        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="#">Forgot password?</a>
        </div>
        <Button className="mb-4 btn" onClick={e => handleSignIn(e)}>Sign in</Button>
        <p className="text-center">Not a member? <Link to='/register'>Register</Link></p>
      </MDBContainer>
    </div>

  );
}

export default Login;
