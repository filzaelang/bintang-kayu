import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { GET_USER } from '../redux/slices/currentUserSlice';
import { useSelector, useDispatch } from 'react-redux';



const useAuth = () => {

    // const [currentUser, setCurrentUser] = useState({});
    const currentUser = useSelector((state) => state.currentUser.data)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // setCurrentUser(user);
                dispatch(GET_USER(user))
                // console.log("Ini adalah current user", currentUser)
            }
            else {
                // setCurrentUser(null);
                dispatch(GET_USER(null))
            }
        })
    }, [])

    return {
        currentUser,
    };
};

export default useAuth;