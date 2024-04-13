import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Helmet from "../components/Helmet/Helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

import '../styles/login.css';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            console.log(user);
            setLoading(false);
            toast.success("Successfully logged in");
            navigate('/home');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return <Helmet title="Login">
        <section className='section'>
            <Container>
                <Row>
                    {
                        loading ? <Col lg='12' className='text-center'><h5
                            className="fw-bold">Loading....</h5></Col> : <Col lg='6' className="m-auto text-center">
                            <div className='form-box'>
                                <h3 className="fw-bold mb-4 ">Login</h3>
                                <Form className='auth__form' onSubmit={signIn}>
                                    <FormGroup className="form__group">
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            value={email} onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input
                                            type="password"
                                            placeholder='Password'
                                            value={password} onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <button
                                        type='submit'
                                        className="buy__btn auth__btn"
                                        id="auth__btn">
                                        Login
                                    </button>

                                    <p>
                                        Belum punya akun ?{" "}
                                        <Link to='/signup'>Buat akun</Link>
                                    </p>

                                </Form>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </section>
    </Helmet>
};

export default Login;
