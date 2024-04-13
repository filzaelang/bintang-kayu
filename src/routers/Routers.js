import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from "./ProtectedRoute";

import AddProducts from '../admin/AddProducts';
import AllProducts from '../admin/AllProducts';
import AllOrder from '../admin/AllOrder';
import EditProducts from '../admin/EditProducts';
import Dashboard from '../admin/Dashboard';
import DetailOrder from '../admin/DetailOrder';
import UserOrderList from '../pages/UserOrderList';
import DetailUserOrder from '../pages/DetailUserOrder';
import EditProfile from '../pages/EditProfile';
import LupaPassword from '../pages/LupaPassword';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path='home' element={<Home/>} />
            <Route path='shop' element={<Shop/>} />
            <Route path='shop/:id' element={<ProductDetails/>} />
            <Route path='lupapassword' element={<LupaPassword/>} />

            <Route path='/*' element={<ProtectedRoute />}>
                <Route path='dashboarduntukadmin1234' element={<Dashboard />} />
                <Route path='dashboarduntukadmin1234/all-products' element={<AllProducts />} />
                <Route path='dashboarduntukadmin1234/all-products/:id' element={<EditProducts />} />
                <Route path='dashboarduntukadmin1234/orders' element={<AllOrder />} />
                <Route path='dashboarduntukadmin1234/orders/:id' element={<DetailOrder/>} />
                <Route path='dashboarduntukadmin1234/add-product' element={<AddProducts />} />
                <Route path='userorderlist' element={<UserOrderList />} />
                <Route path='userorderlist/:id' element={<DetailUserOrder />} />
                <Route path='editprofile' element={<EditProfile />} />
                <Route path='cart' element={<Cart/>} />
            </Route>

            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
        </Routes>
    );
};

export default Routers;
