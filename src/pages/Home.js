import { Heading, Image, Stack, Text, VStack, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import tcgLogo from '../images/pkmn-tcg.png';

export default function Home(){
    return(
        <Flex alignContent='center' justifyContent='center' pt='20vh'>
        
        <Stack direction='row'>
            <VStack alignItems='left' justifyContent="center">
                <Heading size='xl'>Pokémart</Heading>
                <Text fontSize='xl' maxW='50vh'>
                   Pokémart is Winnipeg&apos;s premier one stop shop for all things Pokémon TCG related!
                </Text>
                <Button>
                    <Link to='/shop'>Shop</Link>
                </Button>
            </VStack>
           <Image src={tcgLogo} alt='tcg logo' w={512} h={256}/>
        </Stack>
        </Flex>
    )
}