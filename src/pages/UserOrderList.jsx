import React, { useEffect } from 'react';
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.config';
import { auth } from "../firebase.config"
import { onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDER_LIST } from '../redux/slices/userOrderSlice';

const UserOrderList = () => {
    // const [dataPesananUser, setDataPesananUser] = useState([]);
    const dataPesananUser = useSelector((state) => state.orderList.data);
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.email;
                const q = query(collection(db, "Pesanan"), where("idPembeli", "==", uid));

                getDocs(q).then(docSnap => {
                    let users = [];
                    docSnap.forEach((doc) => {
                        users.push({ ...doc.data(), id: doc.id })
                    });
                    dispatch(GET_ORDER_LIST(users))
                    // setDataPesananUser(users);
                    console.log("Blablabla")
                });
            }
            else {

            }
        })
    }, [])

    return (
        <Helmet title="Pesanan">
            <CommonSection title="Pesanan Saya" />
            <section className='section'>
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
                                        dataPesananUser.map(item => (
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

                                                    <Link to={'' + item.idPesanan}>
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
