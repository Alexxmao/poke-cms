import { Button, Input, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalFooter, ModalCloseButton,FormControl, FormLabel } from "@chakra-ui/react";


export default function EditListing() {


    const { isOpen: isEditOpen, onOpen: editOpen, onClose: editClose } = useDisclosure();
    const [inputs, setInputs] = useState([]);



    return (
        <div>
        <Button onClick={ editOpen }>Edit</Button>
                                            <Modal isOpen={ isEditOpen } onClose={ editClose }>
                                                <ModalOverlay/>
                                                <ModalContent>
                                                    <ModalHeader>Edit Listing</ModalHeader>
                                                    <ModalCloseButton/>
                                                    <ModalBody>
                                                        <form>
                                                            <FormControl>
                                                                <FormLabel>Name</FormLabel>
                                                                    <Input type="text" name="name" value={inputs.name} onChange={handleEditChange}/>
                                                                <FormLabel>Type</FormLabel>
                                                                    <Input type="text" name="type" value={inputs.type} onChange={handleEditChange}/>
                                                                <FormLabel>Rarity</FormLabel>
                                                                    <Input type="text" name="rarity" value={inputs.rarity}onChange={handleEditChange}/>
                                                                <FormLabel>Price</FormLabel>
                                                                    <Input type="number" name="price" value={inputs.price}onChange={handleEditChange}/>
                                                                <FormLabel>Stock</FormLabel>
                                                                    <Input type="number" name="stock" value={inputs.stock}onChange={handleEditChange}/>
                                                                <FormLabel>Image</FormLabel>
                                                                    <Input type="file" name="image" onChange={handleEditChange}/>
                                                            </FormControl>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={ handleSubmit }>Edit Listing</Button>
                                                        <Button onClick={ editClose }>Close</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            </div>
    )
}