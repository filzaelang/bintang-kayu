import React, { useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../custom-hooks/useProducts";
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup, InputLeftElement
} from '@chakra-ui/react';

// icon
import { IoSearch } from "react-icons/io5";

const ProductsList = () => {

    const { data: productsData, loading } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]); // Jika query kosong, set hasil pencarian menjadi array kosong
        } else {
            handleSearch(query.trim());
        }
    };

    const handleSearch = (query) => {
        const filteredProducts = productsData.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log("Ini filtered product", filteredProducts)
        setSearchResults(filteredProducts);
    };

    return (
        <>
            <Flex align="center" justify="center" mb={"40px"}>
                <FormControl>
                    <FormLabel display={"none"}>Search</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<IoSearch color="black" />}
                        />
                        <Input
                            id='search'
                            name='search'
                            type="text"
                            placeholder="Search product"
                            value={searchQuery}
                            onChange={handleChange}
                            color={"black"}
                        />
                    </InputGroup>
                </FormControl>
            </Flex>

            {
                loading ? <h4 className="py-5 text-center fw-bold">Loading.....</h4> :
                    (searchResults.length > 0 ?
                        searchResults.map((item, index) => (
                            <ProductCard item={item} key={item.idProduk} />
                        )) :
                        productsData.map((item, index) => (
                            <ProductCard item={item} key={item.idProduk} />
                        ))
                    )
            }
        </>
    );
};

export default ProductsList;
