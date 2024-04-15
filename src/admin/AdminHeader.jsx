import React from 'react'
import { Container } from "reactstrap";
import '../styles/admin-nav.css';

export default function AdminHeader() {
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
        </>
    )
}
