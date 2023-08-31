import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, useToast, Link, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( !username ) {
            toast({
                title: 'Username Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !password ) {
            toast ({
                title: 'Password Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else {
            const formData = new FormData();
            formData.append("action", "login");
            formData.append("username", username);
            formData.append("password", password);
            axios.post(`http://poke-cms.orgfree.com/api/login`, formData).then((response) => {
                console.log(response.data);
                if(response.data === "Invalid Credentials!"){
                    toast({
                        title: 'Invalid Credentials!',
                        status: 'error',
                        duration: '2000',
                        isClosable: true
                    })
                } else {
                    toast({
                        title: 'Log In Successful! Redirecting...',
                        status: 'success',
                        duration: '2000',
                        isClosable: true
                    })
                    setTimeout(() =>{
                        navigate('/shop/admin')
                    }, 2000)
                }
            });
        }
    }

    return(
        <Flex justifyContent='center'>
            <Box p={8} border='1px' borderRadius='3xl'>
                <Heading mb={8}>Login</Heading>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" name="username" mb={4} onChange={(e) => setUsername(e.target.value)}/>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" mb={4} onChange={(e) => setPassword(e.target.value)}/>
                    <Button colorScheme="blue" w="100%" mt={4} onClick={handleSubmit}>Login</Button>
                </FormControl>
                <Stack mt={8}>
                    <Link href="/signup" fontWeight='bold'>Don&apos;t Have an Account?</Link>
                    <Link fontWeight='bold'>Forgot Password?</Link>
                </Stack>
            </Box>
        </Flex>
    )
}