import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../styles/allproducts.css';
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllProducts = () => {

    const {data: productsData, loading} = useGetData('Produk');
    //productsData itu bisa dibuat-buat sendiri, misal diganti "dataproduk", "qwe", dll

    const deleteProduct = async(id)=> {
        await deleteDoc(doc(db,'Produk', id));
        toast.success("Deleted!");
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
                                    <th>Deskripsi Singkat</th>
                                    <th>Harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <h4 className="py-5 text-center fw-bold">Loading.....</h4> : productsData.map(item=>(
                                        <tr key={item.idProduk}>
                                            <td>
                                                <img src={item.fotoCover} alt="" style={{ width: '80px', height: '80px' }} />
                                            </td>
                                            <td>{item.namaProduk}</td>
                                            <td>{item.deskripsiSingkat}</td>
                                            <td>
                                                {/* Rp {item.hargaProduk} */}
                                                {item.hargaProduk.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                            </td>
                                            <td>
                                                <Link to={''+item.idProduk}>
                                                    <button
                                                        className="btn"
                                                        id="detailProduk">
                                                            Detail
                                                    </button>
                                                </Link>
                                                <br></br><br></br>
                                                <button
                                                    onClick={()=>{deleteProduct(item.id)}} //item.idProduk 
                                                    className="btn" 
                                                    id="hapus">
                                                        Hapus
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

export default AllProducts;