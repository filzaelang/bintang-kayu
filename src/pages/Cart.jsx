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
import useAuthEmail from '../custom-hooks/useAuthEmail';


const Cart = () => {

    const cartItems = useSelector((state)=> state.cart.cartItems);


    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping - Cart" />
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            {
                                cartItems.length===0 ? ( 
                                <h2 className="fs-4 text-center">No item added to the cart</h2>
                                 ) : (
                                <div>
                                <h4>Transfer pembayaran ke rekening (BRI) 683001000994501 atas nama Wasis Subaryo</h4>
                                <br/>
                                <table className="table bordered">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Jumlah</th>
                                        <th>Hapus</th>
                                        <th>Total Harga</th>
                                        <th>Upload Bukti Pembayaran</th>
                                        <th>Checkout</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((item,index)=>(
                                            <Tr item={item} key={index}/>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};


const Tr = ({ item }) => {

    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id));
    };

    const [buktiPembayaran, setBuktiPembayaran] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    console.log(email)
    const [alamat2, setAlamat2] = useState('');
    const [noHp2, setNoHp2] = useState('');
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const navigate = useNavigate();
    const {currentUserEmail} = useAuthEmail();

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
                    const nama1 = users[0]['nama'];
                    const email1 = users[0]['email'];
                    const alamat1 = users[0]['alamat'];
                    const noHp1 = users[0]['nomorTelepon'];
                    setNama(nama1)
                    setEmail(email1)
                    setAlamat2(alamat1)
                    setNoHp2(noHp1)
                });
            }
            else{
                
            }
        })
    })

    const addPesananDua = async(e)=>{
        // e.preventDefault();
        setLoading(true);
    
        // //====================== Add Product to Firebase Firestore Database ==========================//
        try {
            const id_unik = uuidv4().slice(0, 20); 
            const storageRef = ref(storage, 'buktiPembayaran/'+id_unik+'.jpg');
            const uploadTask = uploadBytesResumable(storageRef, buktiPembayaran);
            const totalHarga = item.price*item.quantity;
    
            uploadTask.on(
                'state_changed',
                () => {},
                () => {
                    toast.error('images not uploaded!');
                },
                async ()=>{
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    
                    await setDoc(doc(db,'Pesanan', id_unik),{
                        idPesanan: id_unik,
                        idPembeli: currentUserEmail,
                        idProduk: item.id,
                        jumlahBarang: item.quantity,
                        namaProduk: item.productName,
                        status: "Menunggu Konfirmasi",
                        fotoCover: item.imgUrl,
                        fotoBuktiPembayaran: downloadURL,
                        harga: totalHarga,
                        tanggalPemesanan: serverTimestamp(),
                        tanggalCetakKwitansi: " "
                        
                    })
    
                });
            
            deleteProduct();
            setLoading(false);
            toast.success('Berhasil melakukan pesanan');
            navigate("/home");
        } catch (err) {
            setLoading(false);
            toast.error("Gagal melakukan pesanan");
        }
    
    }

    return (
        <tr>
            <td>
                <img src={item.imgUrl} alt="" />
            </td>
            <td>{item.productName}</td>
            <td>{item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
            <td>{item.quantity}</td>
            <td>
                <motion.i 
                    whileTap={{ scale: 1.2 }}
                    onClick={deleteProduct}
                    className="ri-delete-bin-line">
                </motion.i>
            </td>
            <td>
                {(item.price*item.quantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </td>
            <td>
            <input 
                type="file"
                onChange={e=> setBuktiPembayaran(e.target.files[0])}
                required
            />
            </td>
            <td>
                <button className='buy__btn' onClick={() => addPesananDua(item)}>Checkout</button>
            </td>
        </tr>
    )
}



export default Cart;
