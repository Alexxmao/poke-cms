import { Box, HStack, Heading, Image, SimpleGrid, Text, Button, Input, Flex, Tag } from "@chakra-ui/react";
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
        <Flex alignContent='center' justifyContent='center' m={8}>
            <SimpleGrid columns={4} spacing={8}>
                {listings.map((listing, key) =>
                    <Box key={key} color='black' borderWidth='4px' borderRadius='lg' w={350}>
                        <Image src={'https://bit.ly/2Z4KKcF'}/>
                        <Box m={4}>
                            <Heading>{listing.name}</Heading>
                            {/* TODO: ADD COLOURED TAG FOR TYPE */}
                            <Tag>Type: {listing.type}</Tag>
                            <Tag>Rarity: {listing.rarity}</Tag>
                            <Text>${listing.price}</Text>
                            <Text>{listing.stock} In Stock</Text>
                            <HStack>
                                <Input type='number' placeholder="Amount"/>
                                <Button fontSize='xs'>Add to Cart</Button>
                            </HStack>
                        </Box>
                    </Box>
                )}
            </SimpleGrid>
        </Flex>
    )
}