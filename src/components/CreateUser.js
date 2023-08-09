import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function CreateUser() {
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
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" onChange={handleChange}/>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange}/>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="fname" onChange={handleChange}/>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lname" onChange={handleChange}/>
                <FormLabel>Address</FormLabel>
                <Input type="text" name="address" onChange={handleChange}/>    
            </FormControl>
        </div>
    )
}