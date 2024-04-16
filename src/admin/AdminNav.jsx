import React from "react";  //6.9k (gzipped: 2.7k)
import { Container, Row, Col } from "reactstrap";
import userIcon from '../assets/images/user-icon.png'

import useAuth from "../custom-hooks/useAuth";
import '../styles/admin-nav.css';

import { NavLink } from "react-router-dom";

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboarduntukadmin1234'
    },
    {
        display: 'Add-Product',
        path: 'dashboarduntukadmin1234/add-product'
    },
    {
        display: 'All-Products',
        path: 'dashboarduntukadmin1234/all-products'
    },
    {
        display: 'Orders',
        path: 'dashboarduntukadmin1234/orders'
    },

]

const AdminNav = () => {

    return (
        <>
            <header className="admin__header">
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top">
                            <div className="logo">
                                <h2>Bintang Kayu</h2>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>

            <section className="admin__menu p-0 section">
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {
                                    admin__nav.map((item, index) => (
                                        <li className="admin__menu-item" key={index}>
                                            <NavLink
                                                to={item.path}
                                                className={navClass => navClass.isActive ? 'active__admin-menu' : ''}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default AdminNav;