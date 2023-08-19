import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios"
import { useState, useEffect } from "react";

export default function DisplayListing() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings();
    }, []);

    const getListings = () => {
        axios.get('http://localhost:31337/api/listings/').then((response)=>{
            console.log(response.data);    
            setListings(response.data);
        });
    }

    return(
        <SimpleGrid columns={3}>
                {listings.map((listing, key) =>
                            <Box key={key} bg='black' color='white' w={512} alignItems='center'>
                                <Image src='https://bit.ly/2Z4KKcF'/>
                                <Heading>{listing.name}</Heading>
                                <Text>{listing.type}</Text>
                                <Text>{listing.rarity}</Text>
                                <Text>${listing.price}</Text>
                                <Text>{listing.stock} In Stock</Text>
                            </Box>
                        )}
            </SimpleGrid>
    )
}