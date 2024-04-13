import React,{useState} from 'react';
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth } from '../firebase.config';
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import '../styles/login.css';
import '../styles/signup.css';

const Signup = () => {

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [nohp, setNohp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();



    const signup = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password);
            
            var randomId = Math.random();
            const user = userCredential.user;
            const storageRef = ref(storage, "fotoProfil/"+randomId+".jpg");
            const uploadTask = uploadBytesResumable(storageRef, file);
            

            uploadTask.on((error)=>{
                toast.error(error.message);
            }, ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                    
                    //Store user data in firestore database
                    await setDoc(doc(db,'users', user.email),{
                        nama: nama,
                        email: email,
                        id: email,
                        nomorTelepon: nohp,
                        alamat: alamat,
                        fotoProfil: downloadURL,
                        profileCompleted: 1
                    })

                    //Update user profile
                    await updateProfile(user, {
                        displayName: nama,
                        // photoURL: downloadURL
                    })
                });
            });

            setLoading(false);
            toast.success("Berhasil Mendaftar");
            navigate('/login')
        } catch (error) {
            setLoading(false);
            toast.error("something went wrong");
        };
    };
      

    return <Helmet title="Signup">
        <section>
            <Container>
                <Row>
                    {
                        loading? ( 
                        <Col lg="12" className='text-center'>
                            <h5 className='fw-bold'>Loading....</h5>
                        </Col>
                        ) : ( <Col lg='6' className="m-auto text-center">
                                <div className='form-box'>
                                    <h3 className="fw-bold mb-4 ">Signup</h3>
                                    <Form className='auth__form' onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input 
                                                type="text" 
                                                placeholder='Nama'
                                                value={nama} onChange={e=> setNama(e.target.value)}
                                                required 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input 
                                                type="email" 
                                                placeholder='Email'
                                                value={email} onChange={e=> setEmail(e.target.value)}
                                                required 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input 
                                                type="number" 
                                                placeholder='No Hp / WA'
                                                value={nohp} onChange={e=> setNohp(parseInt(e.target.value))}
                                                required 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input 
                                                type="text" 
                                                placeholder='Alamat'
                                                value={alamat} onChange={e=> setAlamat(e.target.value)}
                                                required 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input 
                                                type="password" 
                                                placeholder='Password'
                                                value={password} onChange={e=> setPassword(e.target.value)}
                                                required 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group" id='pengecualian'>
                                        <label>
                                            Pilih Foto Profil:
                                        <input 
                                            type="file" 
                                            onChange={e=> setFile(e.target.files[0])}
                                            required 
                                        />
                                        </label>
                                        </FormGroup>
                                        <button
                                            type='submit'
                                            className="buy__btn auth__btn" 
                                            id="auth__btn">
                                                Buat Akun
                                        </button>
                                        
                                        <p>
                                            Sudah punya akun ?{" "}
                                            <Link to='/login'>Masuk</Link> 
                                        </p>
                                        
                                    </Form>
                                </div>
                                </Col>
                            )}
                </Row>
            </Container>
        </section>
    </Helmet> 
};

export default Signup;
