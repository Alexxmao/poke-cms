import { Flex, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login(){
    return(
        <Flex height='50vh' justifyContent='center'>
            <Box bg='gray'>
                <Heading>Login to Your Account</Heading>
                <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username"/>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password"/>
            </FormControl>
            </Box>
        </Flex>
   
    )
}