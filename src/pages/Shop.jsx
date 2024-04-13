// import React,{useState} from 'react';
import React from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container,Row,Col } from "reactstrap";
import "../styles/shop.css";
import "../custom-hooks/useGetData"
// import useGetData from '../custom-hooks/useGetData';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

    return (
        <Helmet title="Shop">
            <CommonSection title="Products">
            </CommonSection>

                <section>
                    <Container>
                        <Row>
                            <Col lg='12' md='12'>
                                
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="pt-0">
                    <Container>
                        <Row>
                        <ProductsList />
                        </Row>
                    </Container>
                </section>

        </Helmet>
    );  
};

export default Shop;
