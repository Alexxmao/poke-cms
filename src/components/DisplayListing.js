import { Box, HStack, Heading, Image, SimpleGrid, Text, Button, Input, Flex, Tag, Stack, Select } from "@chakra-ui/react";

import axios from "axios"
import { useState, useEffect } from "react";

export default function DisplayListing() {

    const [listings, setListings] = useState([]);
    const [sortType, setSortType] = useState('default');

    const getListings = () => {
        axios.get('http://localhost:31337/api/listings/').then((response)=>{    
            setListings(response.data);
        });
    }

    useEffect(() => {
        getListings();
    }, []);

    const handleChange = (e) =>{
        setSortType(e.target.value);
    }

    useEffect(() =>{
        const listingsCopy = [...listings];

        switch (sortType) {
            default:
                setListings(listingsCopy)
                break;

            case "name":
                const nameSorted = listingsCopy.sort((a ,b) => {
                    a = a.name.toLowerCase();
                    b = b.name.toLowerCase();

                    return a < b ? -1: a > b ? 1: 0;
                });
                setListings(nameSorted);
                break;

            case "date-asc":
                const ascDateSorted = listingsCopy.sort((a , b) => {
                    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
                });

                setListings(ascDateSorted);
                break;

            case "date-desc":
                const descDateSorted = listingsCopy.sort((a , b) => {
                    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
                });
                setListings(descDateSorted);
                break;

            case "price-asc":
                const ascPriceSorted = listingsCopy.sort((a,b) =>
                parseFloat(a.price) - parseFloat(b.price)
                );
                setListings(ascPriceSorted);
                break;

            case "price-desc":
                const descPriceSorted = listingsCopy.sort((a,b) =>
                parseFloat(b.price) - parseFloat(a.price)
                );
                setListings(descPriceSorted);
                break;
        }

    },[sortType])
    
    if(listings.length > 0){
        return(
            <Flex alignContent='center' justifyContent='center' m={8}>
                <Stack>
                    <Select placeholder="Sort By" w={48} overflow='hidden' onChange={handleChange}>
                        <option value="name">Name</option>

                        <option value="date-asc">Latest</option>
                        <option value="date-desc">Oldest</option>
                        <option value="price-asc">Price: Ascending</option>
                        <option value="price-desc">Price: Decending</option>
                    </Select>
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
                </Stack>
            </Flex>
        )
    } else {
        return(
            <Flex alignContent='center' justifyContent='center' pt="25vh" m={8}>
                <Heading>No Listings Currently!</Heading>
            </Flex>
        )
    }
    
}