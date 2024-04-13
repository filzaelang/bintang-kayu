import React, { useState, useEffect } from 'react';
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container,Row,Col } from "reactstrap";
import {motion} from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import { collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase.config';
import {auth} from "../firebase.config"
import {onAuthStateChanged} from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify';
import { storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import useGetData from '../custom-hooks/useGetData';

const UserOrderList = () => {

    const {data: dataPesanan, loading} = useGetData('Pesanan');

    const [dataPesananUser, setDataPesananUser] = useState([]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const uid = user.email;
                const q = query(collection(db, "Pesanan"), where("idPembeli", "==", uid));
                
                getDocs(q).then(docSnap => {
                    let users = [];
                    docSnap.forEach((doc)=> {
                        users.push({ ...doc.data(), id:doc.id })
                    });
                    setDataPesananUser(users);
                    
                });
            }
            else{
                
            }
        })
    })

    return (
        <Helmet title="Pesanan">
            <CommonSection title="Pesanan Saya" />
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Nama Produk</th>
                                    <th>Jumlah Barang</th>
                                    <th>Total Pembayaran</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    dataPesananUser.map(item=>(
                                        <tr key={item.idPesanan}>
                                            <td>
                                                <img src={item.fotoCover} alt="" style={{ width: '80px', height: '80px' }} />
                                            </td>
                                            <td>{item.namaProduk}</td>
                                            <td>{item.jumlahBarang}</td>
                                            <td>
                                                {/* Rp {item.hargaProduk} */}
                                                {item.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                            </td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>
                                                
                                                <Link to={''+item.idPesanan}>
                                                    <button
                                                        className="btn"
                                                        id="detailPesanan">
                                                            Detail
                                                    </button>
                                                </Link>
                                                <br></br><br></br>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};


export default UserOrderList;
