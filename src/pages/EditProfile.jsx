import React, { useState, useEffect } from 'react';
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth } from '../firebase.config';
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {onAuthStateChanged} from "firebase/auth";
import '../styles/login.css';
import '../styles/signup.css';
import { v4 as uuidv4 } from 'uuid';

const EditProfile = () => {

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [nohp, setNohp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const [dataUser, setDataUser] = useState([]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const uid = user.email;
                const q = query(collection(db, "users"), where("email", "==", uid));
                
                getDocs(q).then(docSnap => {
                    let users = [];
                    docSnap.forEach((doc)=> {
                        users.push({ ...doc.data(), id:doc.id })
                    });
                    const email1 = users[0]['email'];
                    setEmail(email1);
                    setDataUser(users);
                    
                });
            }
            else{
                
            }
        })
    })

    const updateNamaUser = async(email, nama) => {
        await updateDoc(doc(db, 'users', email), {nama: nama});
        toast.success("Berhasil di Update");
    }
    const updateNoHpUser = async(email, nohp) => {
        await updateDoc(doc(db, 'users', email), {nomorTelepon: nohp});
        toast.success("Berhasil di Update");
    }
    const updateAlamat = async(email, alamat) => {
        await updateDoc(doc(db, 'users', email), {alamat: alamat});
        toast.success("Berhasil di Update");
    }
    const updateFotoProfil = async(email) => {
        const id_unik = uuidv4();
        const storageRef = ref(storage, 'products/'+id_unik+'.jpg');
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
            'state_changed',
            () => {},
            () => {
                toast.error('images not uploaded!');
            },
            async ()=>{
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await updateDoc(doc(db, 'users', email), {fotoProfil: downloadURL});
                toast.success("Berhasil di Update"); 
            });
    }
  

    return <Helmet title="Signup">
        <section>
            <Container>
                <Row>
                    {
                        dataUser.map(item=>(
                            <Col lg='6' className="m-auto text-center">
                                <div className='form-box'>
                                    <h3 className="fw-bold mb-4 ">Profil Saya</h3>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><button className='buy__btn' onClick={() => updateNamaUser(item.id, nama)}>Update Nama</button></th>
                                                <th><button className='buy__btn' onClick={() => updateNoHpUser(item.id, nohp)}>Update No Hp</button></th>
                                                <th><button className='buy__btn' onClick={() => updateAlamat(item.id, alamat)}>Update Alamat</button></th>
                                                <th><button className='buy__btn' onClick={() => updateFotoProfil(item.id)}>Update Foto Profil</button></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <Form className='auth__form'>
                                        <FormGroup className="form__group">
                                            <label className='label'>Nama</label>
                                            <input 
                                                type="text" 
                                                placeholder='Nama'
                                                defaultValue={item.nama} 
                                                onChange={e=> setNama(e.target.value)}
                                                 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <label className='label'>Email</label>
                                            <input 
                                                type="email" 
                                                placeholder='Email'
                                                defaultValue={item.email} 
                                                disabled
                                                className='label'
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <label className='label'>No Hp / Whatsapp</label>
                                            <input 
                                                type="number" 
                                                placeholder='No Hp / WA'
                                                defaultValue={"0"+item.nomorTelepon}
                                                onChange={e=> setNohp(parseInt(e.target.value))}
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <label className='label'>Alamat</label>
                                            <input 
                                                type="text" 
                                                placeholder='Alamat'
                                                defaultValue={item.alamat} 
                                                onChange={e=> setAlamat(e.target.value)}
                                                 
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group" id='pengecualian'>
                                        <FormGroup>
                                            <img src={item.fotoProfil}></img>
                                        </FormGroup>
                                        <label className='label'>
                                            Pilih Foto Profil:
                                        <input 
                                            type="file" 
                                            onChange={e=> setFile(e.target.files[0])}
                                             
                                        />
                                        </label>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>
    </Helmet> 
};

export default EditProfile;
