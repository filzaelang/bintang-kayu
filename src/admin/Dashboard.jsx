import React from "react"; 
import { Col, Container, Row } from "reactstrap";
import "../styles/dashboard.css";

import useGetData from '../custom-hooks/useGetData';

const Dashboard = () => {

    const {data: products} = useGetData('Produk');
    // const {data: }
    
    return (
        <>
        <section>
            <Container>
                <Row className="align-text-center">
                    <h2>Selamat Datang Admin !!!</h2>
                </Row>
            </Container>
        </section>
        </>
    );
};

export default Dashboard;