import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { Text, Flex, Box } from '@chakra-ui/react'

const MenuItem = ({ children, isLast, to='/' }) => {
    return (
        <Text
        mb={{ base: isLast ? 0:8, sm: 0}}
        mr={{ base: 0, sm: isLast ? 0:8 }}
        display="block"
        fontWeight='extrabold'
        // color="white"
        // _hover={{color: "yellow"}}
        >
            <ChakraLink>{children}</ChakraLink>
        </Text>
    )
}

const Header = () => {
  
    return(
      <Flex
          mb={8}
          py={4}
          px={8}
          as="nav"
          align="center"
          justify="center"
          wrap="wrap"
          w="100%"
          // bgColor='#CC0000'
          // borderWidth='8px'
          // borderColor='#3B4CCA'
      >
          <Box
            flexBasis='auto'
          >
            <Flex
              align="center"
              justify={['right', 'space-between', 'flex-end', 'flex-end']}
              direction={['column', 'row', 'row', 'row']}
              pt={[4, 4, 0, 0]}
            >
              <ReactRouterLink to="/">
                <MenuItem>HOME</MenuItem>
              </ReactRouterLink>
              <ReactRouterLink to="/shop">
                <MenuItem>SHOP</MenuItem>
              </ReactRouterLink>
              <ReactRouterLink to='/login'>
                <MenuItem isLast>ACCOUNT</MenuItem>
              </ReactRouterLink>
            </Flex>
          </Box>
      </Flex>
    )
}

export default Header;