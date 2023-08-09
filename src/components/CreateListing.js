import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function CreateListing() {
    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://localhost:31337/api/', inputs);
    }

    return (
        <div>
            <FormControl onSubmit={handleSubmit}>
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
                <Input type="image" name="image" onChange={handleChange}/>
            </FormControl>
        </div>
    )
}