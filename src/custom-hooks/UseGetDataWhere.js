import { useEffect, useState } from 'react';
import {db} from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
// field, operator, 


const useGetDataWhere = (collectionName, field, operator, value ) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    useEffect(() =>{
        const getData = async () => {
            await onSnapshot(collectionRef.where(field, operator, value), (snapshot) => {
                setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
            });
        };

        getData();
    },[]);

    return { data };
};

export default useGetDataWhere;