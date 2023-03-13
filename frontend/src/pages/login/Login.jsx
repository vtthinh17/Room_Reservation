import './form.css';
import instance from "../../service/index"
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { MDBContainer, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Button } from 'reactstrap';
import AuthConstant from '../../constant/AuthConstant';

const Login = () => {
  const [data, setData] = useState({
    userName: '',
    passWord: '',
  });
  const { error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(data)
  };
  const handleSignIn = async (e) => {
    console.log("sent:", data)
    e.preventDefault();
    dispatch({ type: AuthConstant.LOGIN_START });
    try {
      const res = await instance.post("/auth/login", data);
      dispatch({ type: AuthConstant.LOGIN_SUCCESS, payload: res.data.details });
      console.log("login success")
      navigate("/home")
    } catch (err) {
      dispatch({ type: AuthConstant.LOGIN_FAILED, payload: err.response.data });
    }
  };
  return (
    <div className="form__container">
      <h2 className="fw-bold mt-2 text-center">Sign in</h2>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Username' id='userName' type='text' name='userName' />
        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Password' id='passWord' type='password' name="passWord" />
        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        </div>
        <Button className="mb-4 btn" onClick={handleSignIn}>Sign in</Button>
        <p className="text-center">Not a member? <Link to='/register'>Register</Link></p>
        {error && <span className='text-center' style={{ color: "red" }}>{error.message}</span>}
      </MDBContainer>
    </div>

  );
}

export default Login;
