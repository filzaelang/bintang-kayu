import React,{useState} from "react";  //6.9k (gzipped: 2.7k)
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/login.css';
import {toast} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { db,storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

    const [enterTitle, setEnterTitle] = useState();
    const [enterShortDesc, setEnterShortDesc] = useState();
    const [enterDescription, setEnterDescription] = useState();
    const [enterPrice, setEnterPrice] = useState();
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addProduct = async(e)=>{
        e.preventDefault();
        setLoading(true);

        //====================== Add Product to Firebase Firestore Database ==========================//
        try {
            const docRef = await collection(db,'Produk');
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
                    // await addDoc(docRef, {
                    //     namaProduk: enterTitle,
                    //     deskripsiSingkat: enterShortDesc,
                    //     deskripsiLengkap: enterDescription,
                    //     hargaProduk: enterPrice,
                    //     fotoCover: downloadURL,
                    // });
                    //Store user data in firestore database
                    await setDoc(doc(db,'Produk', id_unik),{
                        idProduk: id_unik,
                        namaProduk: enterTitle,
                        deskripsiSingkat: enterShortDesc,
                        deskripsiLengkap: enterDescription,
                        hargaProduk: enterPrice,
                        fotoCover: downloadURL,
                    })

                });

            setLoading(false);
            toast.success('product successfully added!');
            navigate("/dashboard/all-products");
        } catch (err) {
            setLoading(false);
            toast.error("product not added:");
        }

        // console.log(product);
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Loading......</h4> : <>
                                <h4 className="mb-5">Tambah Produk</h4>
                                <div className="form-box">
                                <Form onSubmit={addProduct}>
                                    <FormGroup className="form__group">
                                        <span>Nama Produk</span>
                                        <input type="text" placeholder=""
                                            value={enterTitle} onChange={e=> setEnterTitle(e.target.value)}
                                            required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Deskripsi Singkat</span>
                                        <input type="text" placeholder=""
                                            value={enterShortDesc} onChange={e=> setEnterShortDesc(e.target.value)}
                                            required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Deskripsi Lengkap</span>
                                        {/* <input type="text" placeholder=""
                                            value={enterDescription} onChange={e=> setEnterDescription(e.target.value)}
                                            required /> */}
                                        <textarea
                                            value={enterDescription}
                                            onChange={e=> setEnterDescription(e.target.value)}
                                            rows="10"
                                            ></textarea>
                                    </FormGroup>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Harga (Rupiah) </span>
                                            {/* <input type="number" placeholder=""
                                                value={enterPrice} onChange={e=> setEnterPrice(e.target.value)}
                                                required /> */}
                                            <input type="number" placeholder=""
                                                value={enterPrice} onChange={e=> setEnterPrice(parseInt(e.target.value))}
                                                required />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Foto Produk</span>
                                            <input 
                                                type="file"
                                                onChange={e=> setEnterProductImg(e.target.files[0])}
                                                required
                                            />
                                        </FormGroup>
                                    </div>
                                    <button className="buy__btn" type="submit">Tambah Produk</button>
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

export default AddProducts;