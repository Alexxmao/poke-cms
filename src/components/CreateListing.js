import { FormControl, FormLabel, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function CreateListing({admin}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [rarity, setRarity] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        if ( !name ) {
            toast({
                title: 'Name Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !type ) {
            toast ({
                title: 'Type Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !rarity ) {
            toast ({
                    title: 'Rarity Field Missing',
                    status: 'error',
                    duration: '2000',
                    isCloseable: true
            }); 
        } else if ( !price ) {
            toast ({
                    title: 'Price Field Missing',
                    status: 'error',
                    duration: '2000',
                    isCloseable: true
            });
        } else if ( !stock ) {
            toast ({
                    title: 'Stock Field Missing',
                    status: 'error',
                    duration: '2000',
                    isCloseable: true
            });
        } else if ( !image ) {
            toast ({
                    title: 'Image Field Missing',
                    status: 'error',
                    duration: '2000',
                    isCloseable: true
            });
        } else {
            onClose();
            const formData = new FormData();
            formData.append('action', 'create');
            formData.append('name', name);
            formData.append('type', type);
            formData.append('rarity', rarity);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('image', image);
            e.preventDefault();
            axios.post('http://poke-cms.orgfree.com/api/listings/save', formData, {
                headers:{'Content-Type':"multipart/form-data"},
            }).then((response) => {
                console.log(response.data);
                window.location.reload(true);
            });
        }
        
    }

    return (
        <div>
        { admin ? 
            <div>
                <Button onClick={ onOpen }>Create Listing</Button>
                <Modal isOpen={ isOpen } onClose={ onClose }>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Create Listing</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <form>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                        <Input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                                    <FormLabel>Type</FormLabel>
                                        <Input type="text" name="type" onChange={(e) => setType(e.target.value)}/>
                                    <FormLabel>Rarity</FormLabel>
                                        <Input type="text" name="rarity" onChange={(e) => setRarity(e.target.value)}/>
                                    <FormLabel>Price</FormLabel>
                                        <Input type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>
                                    <FormLabel>Stock</FormLabel>
                                        <Input type="number" name="stock" onChange={(e) => setStock(e.target.value)}/>
                                    <FormLabel>Image</FormLabel>
                                        <Input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={ handleSubmit }>Create Listing</Button>
                            <Button onClick={ onClose } ml={4}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        : <></> }
        </div>
    )
}