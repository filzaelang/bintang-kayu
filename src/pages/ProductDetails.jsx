import React,{ useState , useEffect } from 'react';

import { Container,Row,Col } from "reactstrap";
import { useParams } from "react-router-dom";

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import "../styles/product-details.css"
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData';
import accounting from 'accounting';

const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const [tab,setTab] = useState('desc');
    const {id} = useParams();
    
    const docRef = doc(db,'Produk', id);
    const { data: products } = useGetData('Produk')

    useEffect(()=>{
        const getProduct = async()=>{
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setProduct(docSnap.data())
            } else {
                console.log('no product!')
            }
        }

        getProduct()
    },[])

    const {fotoCover, namaProduk, hargaProduk, deskripsiLengkap, deskripsiSingkat } = product

    const addToCart = () => {
        dispatch(cartActions.addItem({
                id : id,
                productName: namaProduk,
                price: hargaProduk,
                imgUrl:fotoCover,
            })
        );
        
        toast.success("Product added successfully");
    };

    useEffect(() => {
        window.scrollTo(0,0)
    }, [product]);

    return (
        <Helmet title={namaProduk}>
            <CommonSection title={namaProduk} />

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={fotoCover} alt="" />
                        </Col>

                        <Col lg="6">
                            <div className="product__details">
                                <h2>{namaProduk}</h2>
                                

                                <span className="product__price">{accounting.formatMoney(hargaProduk, "Rp ")}</span>
                                <p className="mt-3">{deskripsiSingkat}</p>

                                
                                <textarea
                                    value={deskripsiLengkap}
                                    rows="12"
                                    readOnly
                                    ></textarea>

                                <motion.button 
                                    whileTap={{ scale: 1.2 }} 
                                    className="buy__btn"
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
        
};

export default ProductDetails;
