import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, useToast, Link, Stack} from "@chakra-ui/react";
import axios from "axios";
import { useState } from 'react';

export default function SignUp(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( !firstName ) {
            toast({
                title: 'First Name Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !lastName ) {
            toast ({
                title: 'Last Name Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !email ) {
            toast ({
                title: 'Email Field Missing',
                status: 'error',
                duration: '2000',
                isCloseable: true
            });
        } else if ( !username ) {
            toast ({
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
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("password", password);
            axios.post("http://localhost:31337/api/register.php", formData)
        }
        
    }
    


    return(
        <Flex justifyContent='center'>
            <Box p={8} border='1px' borderRadius='3xl'>
                <Heading mb={8}>Sign Up</Heading>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name="firstName" mb={4} onChange={(e) => setUsername(e.target.value)}/>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name="lastName" mb={4} onChange={(e) => setPassword(e.target.value)}/>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" mb={4} onChange={(e) => setUsername(e.target.value)}/>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" name="username" mb={4} onChange={(e) => setUsername(e.target.value)}/>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" mb={4} onChange={(e) => setPassword(e.target.value)}/>
                    <Button colorScheme="blue" w="100%" mt={4} onClick={handleSubmit}>Log In</Button>
                </FormControl>
                <Stack mt={8}>
                    <Link href="/login" fontWeight='bold'>Have an Account?</Link>
                    <Link fontWeight='bold'>Forgot Password?</Link>
                </Stack>
            </Box>
        </Flex>
    )
}