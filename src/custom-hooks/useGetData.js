import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector, useDispatch } from "react-redux";
import { GET_PRODUCTS } from '../redux/slices/allProductsSlice';


const useGetData = (collectionName) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);
    // const data = useSelector((state) => state.products.data);
    // const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {

            // ========== Firebase firestore realtime data update ===============
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                // dispatch(GET_PRODUCTS(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
                setLoading(false);
            });

            // const data = await getDocs(collectionRef);
            // setData(data.docs.map(doc=>({...doc.data(), id: doc.id})));
            // setLoading(false);
        }

        getData();
    }, []);

    return { data, loading };
};

export default useGetData;