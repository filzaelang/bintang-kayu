import React,{ useState , useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/login.css';
import {toast} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { db,storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDoc, setDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";



const EditProducts = () => {

    const {id} = useParams();
    const [produk, setProduk] = useState({});
    const docRef = doc(db,'Produk', id);

    useEffect(()=>{
        const getProduk = async()=>{
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setProduk(docSnap.data());
                
            } else {
                console.log('Tidak ada pesanan')
            }
        }

        getProduk()
    },[])

    const { idProduk, namaProduk, hargaProduk, fotoCover, deskripsiSingkat, deskripsiLengkap } = produk;

    useEffect(() => {
        window.scrollTo(0,0)
    }, [produk]);

    const [enterTitle, setEnterTitle] = useState();
    const [enterShortDesc, setEnterShortDesc] = useState();
    const [enterDescription, setEnterDescription] = useState();
    const [enterPrice, setEnterPrice] = useState();
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idProdukJelas, setIdProdukJelas] = useState();

    const navigate = useNavigate();

    const updateNamaProduk = async(idProduk, namaProduk) => {
        await updateDoc(doc(db, 'Produk', idProduk), {namaProduk: namaProduk});
        toast.success("Berhasil di Update");
    }

    const updateDeskripsiSingkat = async(idProduk, deskripsiSingkat) => {
        await updateDoc(doc(db, 'Produk', idProduk), {deskripsiSingkat: deskripsiSingkat});
        toast.success("Berhasil di Update"); 
    }

    const updateDeskripsiLengkap = async(idProduk, deskripsiLengkap) => {
        await updateDoc(doc(db, 'Produk', idProduk), {deskripsiLengkap: deskripsiLengkap});
        toast.success("Berhasil di Update"); 
    }

    const updateHarga = async(idProduk, hargaProduk) => {
        await updateDoc(doc(db, 'Produk', idProduk), {hargaProduk: hargaProduk});
        toast.success("Berhasil di Update"); 
    }

    const updateFotoProduk = async(idProduk) => {
            const id_unik = uuidv4();
            const storageRef = ref(storage, 'products/'+id_unik+'.jpg');
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
            
            uploadTask.on(
                'state_changed',
                () => {},
                () => {
                    toast.error('images not uploaded!');
                },
                async ()=>{
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateDoc(doc(db, 'Produk', idProduk), {fotoCover: downloadURL});
                    toast.success("Berhasil di Update"); 
                });
    }


    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Loading......</h4> : <>
                                <h4 className="mb-5 text-center">Edit Produk</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th><button className='buy__btn' onClick={() => updateNamaProduk(idProduk, enterTitle)}>Update Nama Produk</button></th>
                                            <th><button className='buy__btn' onClick={() => updateDeskripsiSingkat(idProduk, enterShortDesc)}>Update Deskripsi Singkat</button></th>
                                            <th><button className='buy__btn' onClick={() => updateDeskripsiLengkap(idProduk, enterDescription)}>Update Deskripsi Lengkap</button></th>
                                            <th><button className='buy__btn' onClick={() => updateHarga(idProduk, enterPrice)}>Update Harga</button></th>
                                            <th><button className='buy__btn' onClick={() => updateFotoProduk(idProduk)}>Update Foto Produk</button></th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <div className="form-box">
                                <Form>
                                    <FormGroup className="form__group">
                                        <span>Nama Produk</span>
                                        <input type="text" placeholder=""
                                            defaultValue={namaProduk}
                                            onChange={e=> setEnterTitle(e.target.value)}
                                            required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Deskripsi Singkat</span>
                                        <input type="text" placeholder=""
                                            defaultValue={deskripsiSingkat}
                                            onChange={e=> setEnterShortDesc(e.target.value)}
                                            required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Deskripsi Lengkap</span>
                                        <textarea
                                            defaultValue={deskripsiLengkap}
                                            onChange={e=> setEnterDescription(e.target.value)}
                                            rows="10"
                                            ></textarea>
                                    </FormGroup>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Harga (Rupiah)</span>
                                            <input type="number" placeholder=""
                                                defaultValue={hargaProduk}
                                                onChange={e=> setEnterPrice(parseInt(e.target.value))}
                                                required />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Foto Produk</span>
                                            <img src={fotoCover} alt="" /> 
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Ganti Foto Produk</span>
                                            <input 
                                                type="file"
                                                onChange={e=> setEnterProductImg(e.target.files[0])}
                                            />
                                            
                                        </FormGroup>
                                    </div>
                                </Form>
                                </div>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default EditProducts;