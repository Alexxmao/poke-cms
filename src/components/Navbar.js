import { Link } from '@chakra-ui/react'
import { Text, Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

const MenuItem = ({ children, isLast, to='/' }) => {
    return (
        <Text
        mb={{ base: isLast ? 0:8, sm: 0}}
        mr={{ base: 0, sm: isLast ? 0:8 }}
        display="block"
        color="black"
        >
            <Link href={to}>{children}</Link>
        </Text>
    )
}

const Header = (props) => {
    const [show, setShow] = useState(false)
    const toggleMenu = () => setShow(!show)
    
    return(
    <Flex
      mb={8}
      pt={8}
      px={8}
      as="nav"
      align="center"
      justify={{sm : "center", base: "space-between"}}
      wrap="wrap"
      w="100%"
    >
      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align="center"
          justify={['right', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/about">ABOUT</MenuItem>
          <MenuItem to="/shop">SHOP</MenuItem>
          <MenuItem to="/contact" isLast>CONTACT</MenuItem>
        </Flex>
      </Box>
    </Flex>
    )
}

export default Header;