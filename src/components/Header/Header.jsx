import React, { useRef, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css'
import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { Box } from '@chakra-ui/react';
import { collection, query, where, getDoc } from "firebase/firestore";
import { db } from '../../firebase.config';
import { onAuthStateChanged } from "firebase/auth";

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
];



const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const profileActionRef = useRef(null);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser.data)
    // const { currentUser } = useAuth();

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.add('sticky__header');
            }
        });
    };

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out');
            navigate("/home");
        }).catch(err => {
            toast.error(err.message);
        })
    }

    useEffect(() => {
        stickyHeaderFunc();

        return () => window.removeEventListener('scroll', stickyHeaderFunc);
    }, []);

    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const uid = userAuth.email;
                const q = query(collection(db, "users"), where("email", "==", uid));
                try {
                    const userSnapshot = await getDoc(q);
                    if (userSnapshot.exists()) {
                        setUser(userSnapshot.data());
                        console.log("userSnapshot", userSnapshot.data())
                    } else {
                        setUser(null); // Clear user if not found
                    }
                } catch (error) {
                    console.error("Error getting user document:", error);
                }
            } else {
                setUser(null); // Clear user if not authenticated
            }
        });

        return () => unsubscribe();
    }, []);


    const menuToggle = () => menuRef.current.classList.toggle('active__menu');

    const navigateToCart = () => {
        navigate('/cart');
    };

    const navigateToOrder = () => {
        navigate('/userorderlist');
    };

    const toggleProfileActions = () => profileActionRef.current.classList.
        toggle('show__profileActions')

    return <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <div>
                            <h1>Bintang Kayu</h1>
                        </div>
                    </div>

                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {nav__links.map((item, index) => (
                                <li className="nav__item" key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={(navClass) =>
                                            navClass.isActive ? 'nav__active' : ''
                                        }
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav__icons">
                        <span className="fav_icons" onClick={navigateToOrder}>
                            <i className="ri-shopping-bag-line"></i>
                        </span>
                        <span className="cart_icon" onClick={navigateToCart}>
                            <i className="ri-shopping-cart-line"></i>
                            <span className="badge">{totalQuantity}</span>
                        </span>

                        <div className='profile show__profileActions'>
                            <motion.img
                                whileTap={{ scale: 1.2 }}
                                // src={currentUser ? user.fotoProfil : userIcon}
                                src={userIcon}
                                alt=""
                                ref={profileActionRef}
                                onClick={toggleProfileActions}
                            />
                            <Box
                                className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions} ms={"-200%"}
                            >
                                {
                                    currentUser ? (
                                        <div className=" d-flex align-items-center justify-content-center flex-column">
                                            <span onClick={logout}>Logout</span>
                                            <Link to='/editprofile'>Edit Profil</Link>
                                        </div>
                                    ) : (
                                        <div className=" d-flex align-items-center justify-content-center flex-column">
                                            <Link to='/signup'>Signup</Link>
                                            <Link to='/login'>Login</Link>
                                            <Link to='/lupapassword'>Lupa Password</Link>
                                        </div>
                                    )
                                }
                            </Box>
                        </div>
                        <div className="mobile__menu">
                            <span onClick={menuToggle}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>



                </div>
            </Row>
        </Container>
    </header>
};

export default Header;
