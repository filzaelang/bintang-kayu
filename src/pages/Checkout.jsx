import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css';
import { useSelector } from "react-redux";


const Checkout = () => {

    const totalQty = useSelector(state=>state.cart.totalQuantity);
    const totalAmount = useSelector(state=>state.cart.totalAmount);

    return<Helmet title="Checkout">
        <CommonSection title="Checkout" />
        <section>
            <Container>
                <Row>
                    <Col lg='6' id="formIsi">
                        <div className='form-box'>
                            <h6 className="mb-4 fw-bold">Billing Information</h6>
                                <Form className='billing__form'>
                                    <FormGroup className='form__group'>
                                        <input type="text" placeholder='Nama' />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="Email" />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="number" placeholder="No Hp / Whatsapp" />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Alamat" />
                                    </FormGroup>
                                </Form>
                        </div>
                    </Col>
                    <Col lg="1">
                        <div></div>
                    </Col>
                    <Col lg="5">
                        <div className="checkout__cart">
                            <h6>Jumlah Produk : <span>{totalQty} items</span></h6>
                            <h4>Total Pembayaran : <span>Rp {totalAmount}</span></h4>
                            <button className="buy__btn auth__btn w-100" id="btn__pesan">
                                Pesan Sekarang
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Helmet>
            
};

export default Checkout;
