import {useState,useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase.config"



const useAuthEmail = () => {

    const [currentUserEmail, setCurrentUserEmail] = useState({});

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUserEmail(user.email);
            }
            else{
                setCurrentUserEmail(null);
            }
        })
    })

    return {
        currentUserEmail,
    };
};

export default useAuthEmail;