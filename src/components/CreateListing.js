import { FormControl, FormLabel, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function CreateListing() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        onClose();
        e.preventDefault();
        axios.post('http://localhost:31337/api/listings/save', inputs).then((response) => {
            console.log(response.data);
            window.location.reload(true);
        });
    }

    return (
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
                                    <Input type="text" name="name" onChange={handleChange}/>
                                <FormLabel>Type</FormLabel>
                                    <Input type="text" name="type" onChange={handleChange}/>
                                <FormLabel>Rarity</FormLabel>
                                    <Input type="text" name="rarity" onChange={handleChange}/>
                                <FormLabel>Price</FormLabel>
                                    <Input type="number" name="price" onChange={handleChange}/>
                                <FormLabel>Stock</FormLabel>
                                    <Input type="number" name="stock" onChange={handleChange}/>
                                <FormLabel>Image</FormLabel>
                                    <Input type="file" name="image" onChange={handleChange}/>
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
    )
}