import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:31337/api/listings/save', inputs).then((response) => {
            console.log(response.data);
            navigate('/');
        });
        console.log(inputs);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit">Create Listing</Button>
            </FormControl>
            </form>
        </div>
    )
}