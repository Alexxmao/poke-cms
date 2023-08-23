import { Box, HStack, Heading,
        Image, SimpleGrid, Text,
        Button, Input, Flex,
        Tag, Stack, Select, Center, 
        useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogHeader,
        AlertDialogBody, AlertDialogFooter, AlertDialogContent } from "@chakra-ui/react";

import axios from "axios"
import { useState, useEffect, useRef } from "react";

export default function DisplayListing() {

    const [listings, setListings] = useState([]);
    const [sortType, setSortType] = useState('default');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

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

    },[sortType]);

    const deleteListing = (id) => {
        axios.delete(`http://localhost:31337/api/listings/${id}/delete`).then((response) =>{
            console.log(response.data);
            window.location.reload(true);
        });
    }
    
    if(listings.length > 0){
        return(
            <Flex alignContent='center' justifyContent='center' m={8}>
                <Stack>
                    <Select placeholder="Sort By" w={48} overflow='hidden' onChange={handleChange}>
                        <option value="name">Name</option>
                        <option value="price-asc">Price: Ascending</option>
                        <option value="price-desc">Price: Decending</option>
                    </Select>
                    <SimpleGrid columns={4} spacing={8}>
                        {listings.map((listing, key) =>
                            <Box key={key} color='black' borderWidth='4px' borderRadius='lg' w={350}>
                                <Image src={'https://bit.ly/2Z4KKcF'}/>
                                <Box m={4}>
                                    <Heading mb={4}>{listing.name}</Heading>
                                    {/* TODO: ADD COLOURED TAG FOR TYPE */}
                                    <Tag mx={8}>Type: {listing.type}</Tag>
                                    <Tag>Rarity: {listing.rarity}</Tag>
                                    <Text my={2}>${listing.price}</Text>
                                    <Text my={2}>{listing.stock} In Stock</Text>
                                    <HStack my={4}>
                                        <Input type='number' placeholder="Amount"/>
                                        <Button fontSize='xs'>Add to Cart</Button>
                                    </HStack>
                                    <Center>
                                        <HStack>
                                            <Button>Edit</Button>
                                            <Button colorScheme='red' onClick={onOpen}>Delete</Button>
                                            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                                                <AlertDialogOverlay>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            Delete Listing
                                                        </AlertDialogHeader>
                                                        <AlertDialogBody>
                                                            Are you sure you would like to delete this listing? You can't undo this action afterwards.
                                                        </AlertDialogBody>
                                                        <AlertDialogFooter>
                                                            <Button ref={cancelRef} onClick={onClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button colorScheme='red' onClick={() => deleteListing(listing.id)} ml={4}>
                                                                Delete
                                                            </Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialogOverlay>
                                            </AlertDialog>
                                        </HStack>
                                    </Center>
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