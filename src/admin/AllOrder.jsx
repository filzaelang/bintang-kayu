import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../styles/allproducts.css';
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllOrder = () => {

    const {data: dataPesanan, loading} = useGetData('Pesanan');


    const updatePesanan = async(id)=> {
        await updateDoc(doc(db, 'Pesanan', id), {status: "Dikonfirmasi", tanggalCetakKwitansi: serverTimestamp()});
        toast.success("Dikonfirmasi"); 
    }

    return (
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
                                    loading ? <h4 className="py-5 text-center fw-bold">Loading.....</h4> : dataPesanan.map(item=>(
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
                                                <button
                                                    onClick={()=>
                                                        {updatePesanan(item.idPesanan)}
                                                    } 
                                                    className="btn success" 
                                                    id="konfirmasi">
                                                        Konfirmasi
                                                </button>
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
    );
};

export default AllOrder;