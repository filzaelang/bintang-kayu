import React from 'react'
import { Container, Flex, Text } from '@chakra-ui/react'
import { NavLink, useLocation } from "react-router-dom";
import AdminHeader from './AdminHeader';

export default function AdminNavbar() {
    const location = useLocation();

    const isItemActive = (path) => {
        return location.pathname === path;
    };

    const navItemStyles = {
        fontWeight: "normal"
    };

    const activeItemStyles = {
        fontWeight: "bolder"
    };

    return (
        <>
            <AdminHeader />
            <section className="admin__menu p-0 section">
                <Container>
                    <Flex gap={10} flexDirection={"row"}>
                        {/* ListItem Dashboard */}
                        <NavLink to="/dashboarduntukadmin1234" style={isItemActive("/dashboarduntukadmin1234") ? activeItemStyles : navItemStyles}>
                            <Flex flexDirection={"row"}>
                                <Text fontSize="md" color={"black"}>Dashboard</Text>
                            </Flex>
                        </NavLink>

                        {/* ListItem Add-Product */}
                        <NavLink to="/dashboarduntukadmin1234/add-product" style={isItemActive("/dashboarduntukadmin1234/add-product") ? activeItemStyles : navItemStyles}>
                            <Flex flexDirection={"row"}>
                                <Text fontSize="md" color={"black"}>Add-Product</Text>
                            </Flex>
                        </NavLink>

                        {/* ListItem All-Products */}
                        <NavLink to="/dashboarduntukadmin1234/all-products" style={isItemActive("/dashboarduntukadmin1234/all-products") ? activeItemStyles : navItemStyles}>
                            <Flex flexDirection={"row"}>
                                <Text fontSize="md" color={"black"}>All-Products</Text>
                            </Flex>
                        </NavLink>

                        {/* ListItem Orders */}
                        <NavLink to="/dashboarduntukadmin1234/orders" style={isItemActive("/dashboarduntukadmin1234/orders") ? activeItemStyles : navItemStyles}>
                            <Flex flexDirection={"row"}>
                                <Text fontSize="md" color={"black"}>Orders</Text>
                            </Flex>
                        </NavLink>
                    </Flex>
                </Container>
            </section>
        </>
    )
}
