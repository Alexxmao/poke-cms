import { Box, HStack, Heading, Image, SimpleGrid, Text, Button, Input } from "@chakra-ui/react";
import axios from "axios"
import { useState, useEffect } from "react";

export default function DisplayListing() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListings();
    }, []);

    const getListings = () => {
        axios.get('http://localhost:31337/api/listings/').then((response)=>{    
            setListings(response.data);
        });
    }

    return(
        <SimpleGrid columns={6} spacing={8}>
                {listings.map((listing, key) =>
                            <Box key={key} color='black' borderWidth='4px' borderRadius='lg' w={256}>
                                <Image src={'https://bit.ly/2Z4KKcF'}/>
                                <Heading>{listing.name}</Heading>
                                <Text>{listing.type}</Text>
                                <Text>{listing.rarity}</Text>
                                <Text>${listing.price}</Text>
                                <Text>{listing.stock} In Stock</Text>
                                <HStack>
                                    <Input type='number'/>
                                    <Button>Add to Cart</Button>
                                </HStack>
                            </Box>
                        )}
            </SimpleGrid>
    )
}