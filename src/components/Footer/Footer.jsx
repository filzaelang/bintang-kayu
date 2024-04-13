import React from 'react';
import './footer.css';

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";


const Footer = () => {
    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="4">
                    <div className="logo">
                        <div>
                            <h1 className='text-white'>Bintang Kayu</h1>
                        </div>
                    </div>
                    <p className='footer_text mt-4' id='putih'>
                        Menyediakan produk-produk Furniture atau Mebel rumahan yang  dibuat langsung oleh pekerja asal Jepara, Jawa Tengah, Indonesia. Kerajinan Furniture seperti Kursi, Meja, Pintu, dan lain-lain. 
                    </p>
                </Col>
                <Col lg="4">
                    <div className="footer__quick-links">
                        <h4 className="quick__links-title">Jam Operasional</h4>
                        <p className='footer_text mt-4' id='putih'>
                            Senin - Minggu : 09.00 - 21.00
                        </p>
                        <p className='footer_text mt-4' id='putih'>
                            Libur Nasional Tutup  
                        </p>
                    </div>
                </Col>
                <Col lg="4">
                    <div className="footer__quick-links">
                        <h4 className="quick__links-title">Kontak</h4>
                        <ListGroup className='footer__contact'>
                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i className="ri-map-pin-line"></i></span>
                                <p><a href="https://goo.gl/maps/957XkFu4AGJkgLXr9">Komplek Bukit Pelamunan Permai Sankyu Blok E6 No. 02, RT 015/RW 003, Kecamatan Kramatwatu, Kabupaten Serang, Banten 42161</a></p>
                            </ListGroupItem>
                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i className="ri-phone-line"></i></span>
                                <p><a href="https://wa.me/6285310160945">0853-1016-0945</a></p>
                            </ListGroupItem>
                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i className="ri-mail-line"></i></span>
                                <p>wasis.subaryo@gmail.com</p>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </Container>

    </footer>
};

export default Footer;
