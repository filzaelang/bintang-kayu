import React from "react";
import ProductCard from "./ProductCard";
import useGetData from "../../custom-hooks/useGetData";

const ProductsList = () => {

    const {data: productsData, loading} = useGetData('Produk');

    return (
        <>
        {
            loading ? <h4 className="py-5 text-center fw-bold">Loading.....</h4> : productsData.map((item, index)=>(
                <ProductCard item={item} key={item.idProduk} />
            ))
        }
        </>
    ); 
};

export default ProductsList;
