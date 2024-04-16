import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import 'react-toastify/dist/ReactToastify.css';
import { Col } from "reactstrap"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase.config';
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProductCard = ({ item }) => {

    const navigate = useNavigate();

    // const {currentUser} = useAuth();
    const currentUser = useSelector((state) => state.currentUser.data)

    const [idUser, setIdUser] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.idProduk,
            productName: item.namaProduk,
            price: item.hargaProduk,
            imgUrl: item.fotoCover,
        })
        );

        toast.success("Product added successdully")
    };

    // useEffect(()=>{
    //     onAuthStateChanged(auth, (user)=>{
    //         if(user){
    //             const uid = user.email;
    //             const q = query(collection(db, "users"), where("email", "==", uid));

    //             getDocs(q).then(docSnap => {
    //                 let users = [];
    //                 docSnap.forEach((doc)=> {
    //                     users.push({ ...doc.data(), id:doc.id })
    //                 });
    //                 const id1 = users[0]['email'];
    //                 setIdUser(id1)
    //             });
    //         }
    //         else{
    //         //    toast.error("Harap login terlebih dahulu") 
    //         }
    //     })
    // })

    const addKeranjang = async (e) => {
        e.preventDefault();
        setLoading(true);

        //====================== Add Product to Firebase Firestore Database ==========================//
        try {
            // const docRef = await collection(db,'Keranjang');
            const id_unik = uuidv4();

            setDoc(doc(db, 'Keranjang', id_unik), {
                IdKeranjang: id_unik,
                IdProduk: item.idProduk,
                IdUser: idUser,
                fotoProduk: item.fotoCover,
                hargaProduk: item.hargaProduk,
                keterangan: "Belum_dibeli",
                namaProduk: item.namaProduk,
            })

            setLoading(false);
            toast.success('product successfully added!');
            navigate("/cart");
        } catch (err) {
            setLoading(false);
            toast.error("product not added:");
        }

        // console.log(product);
    }

    return (
        <Col lg='3' md='4' className='mb-2'>
            <div className="product__item">
                <div className="product__img">
                    <motion.img whileHover={{ scale: 0.9 }} src={item.fotoCover} alt="" />
                </div>
                <div className="p-2 product__info">
                    <h3 className="produce__name">
                        <Link to={'/shop/' + item.idProduk}>{item.namaProduk}</Link>
                    </h3>

                </div>
                <div className="product__card-bottom d-flex align-items-center
                justify-content-between p-2">
                    <span className="price">{item.hargaProduk.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    <motion.span
                        whileTap={{ scale: 1.2 }}
                        onClick={
                            currentUser ? (
                                // addKeranjang
                                addToCart
                            ) : (
                                // toast.error("Harap login terlebih dahulu")
                                addToCart
                            )
                        }
                    >
                        <i className="ri-add-line"></i>
                    </motion.span>
                </div>
            </div>
        </Col>
    )
};

export default ProductCard;
