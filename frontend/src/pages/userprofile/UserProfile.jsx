import { React, useState, useContext } from "react";
import './userprofile.css'
import { Row, Button } from 'reactstrap';
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import instance from "../../service";
export default function PersonalProfile() {
    const [message, setMessage] = useState('')
    const { user } = useContext(AuthContext)
    const [data, setData] = useState({});
    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(data)
    };
    const [dataShow,setDataShow] = useState(user)
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("sent this data to server for update>>>", data)
        try {
            await instance.put("/users/update/" + user._id, data);
            const abc = {...JSON.parse(localStorage.getItem("user")),...data}
            console.log(abc)
            localStorage.setItem("user", JSON.stringify(abc));
            setDataShow(abc);
            setMessage('Update profile success')
            
            // setData(initialFormState)
        } catch (err) {
            setMessage('Something wrong, cannot update now, please try later!')
            console.log(err)
        }


    }
    return (
        <Row style={{ backgroundColor: '#f4f5f7' }}>
            {user ? <div className="col-7">
                <section className="vh-100">
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol className="mb-4 mb-lg-0">
                                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                    <MDBRow className="g-0">
                                        <MDBCol md="4" className="gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                            <MDBTypography tag="h5">
                                            {dataShow.userName}
                                            </MDBTypography>
                                            <MDBIcon far icon="edit mb-5" />
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBCardBody className="p-4">
                                                <MDBTypography tag="h6">Information</MDBTypography>
                                                <hr className="mt-0 mb-4" />
                                                <MDBRow className="pt-1">
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Full name</MDBTypography>
                                                        <MDBCardText className="text-muted">
                                                            {dataShow.fullName}
                                                        </MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Email</MDBTypography>
                                                        <MDBCardText className="text-muted">
                                                            {dataShow.email}
                                                        </MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Phone</MDBTypography>
                                                        <MDBCardText className="text-muted">{dataShow.phone}</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Address</MDBTypography>
                                                        <MDBCardText className="text-muted">{dataShow.address}</MDBCardText>
                                                    </MDBCol>

                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>
                : <div className="col-6">
                    No user
                </div>
            }
            <div className="col-5 container" >
                <div className="form__container" >
                    <MDBContainer>
                        <h2 className="fw-bold mt-2 text-center">Edit Profile</h2>
                        <span>*Adjust field you want to update your profile and save.</span>
                        {/* <MDBContainer className="p-3 my-5 d-flex flex-column w-50"> */}
                        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Full Name' id='fullName' type='text' placeholder={user.fullName}/>
                        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Email' id='email' type='text' placeholder={user.email}/>
                        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Address' id='address' type='text' placeholder={user.address}/>
                        <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Phone Number' id='phone' type='text' placeholder={user.phone}/>
                        {/* <MDBInput onChange={handleChange} wrapperClass='mb-4' label='Confirm password' id='cfpassWord' type='password' /> */}
                        <div className="savebtn">
                            <Button className="mb-4" onClick={handleUpdate}>Save <FontAwesomeIcon icon={faEdit} /></Button>
                        </div>
                    </MDBContainer>
                </div>
                <div className="text-center" style={{ color: "red" }}>{message}</div>
            </div>
        </Row>
    );
}