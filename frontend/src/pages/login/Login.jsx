import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { Button } from 'reactstrap';

function App() {

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    // check account valid & navigate to Home or Admin Dasboard............
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    // add account to database & navigate to Login or Home Page............
  }

  return (
    <div className="form__container">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50 ">

        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>

          <MDBTabsPane show={justifyActive === 'tab1'}>
            <h1 className="text-center mb-3">Sign in</h1>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" onClick={handleSignIn}><Link to='/home'>Sign In</Link></MDBBtn>
            <p className="text-center">Not a member? <Button onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Register</Button></p>

          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            <h1 className="text-center mb-3">Register</h1>
            <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' />
            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' />
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100" onClick={handleSignUp}>Sign up</MDBBtn>

          </MDBTabsPane>

        </MDBTabsContent>

      </MDBContainer>
    </div>

  );
}

export default App;