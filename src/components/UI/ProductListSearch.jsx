import React from "react";
import ProductCard from "./ProductCard";
import useGetData from "../../custom-hooks/useGetData";

const ProductListSearch = ({data}) => {

    return (
        <>
        {
            data?.map((item, index)=>(
                <ProductCard item={item} key={item.idProduk} />
            ))
        }
        </>
    ); 
};

export default ProductListSearch;
