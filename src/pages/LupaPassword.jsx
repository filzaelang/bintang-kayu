import React,{useState} from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-toastify";
import '../styles/login.css';
import app from '../firebase.config';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const LupaPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const auth = getAuth(app);

    
    const triggerResetEmail = async () => {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent")
    }

    return <Helmet title="Lupa Password">
        <section>
            <Container>
                <Row>
                    {
                        loading ? <Col lg='12' className='text-center'><h5
                        className="fw-bold">Loading....</h5></Col> : <Col lg='6' className="m-auto text-center">
                        <div className='form-box'>
                            <h3 className="fw-bold mb-4 ">Lupa Password</h3>
                            <Form className='auth__form' onSubmit={e => { e.preventDefault(); triggerResetEmail()}}>
                                <FormGroup className="form__group">
                                    <label className='label'>Masukkan email akun</label>
                                    <input 
                                        type="email" 
                                        placeholder='Email'
                                        value={email} onChange={e=> setEmail(e.target.value)}
                                        required 
                                    />
                                </FormGroup>

                                <button
                                    type='submit'
                                    className="buy__btn auth__btn" 
                                    id="auth__btn">
                                        Kirim link reset password
                                </button>
                            </Form>
                        </div>
                    </Col>
                    }
                </Row>
            </Container>
        </section>
    </Helmet> 
};

export default LupaPassword;