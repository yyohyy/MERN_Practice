import React from 'react'
import { Box, Button, Container, Flex, HStack,Icon, Text, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaLeaf } from "react-icons/fa";
const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode();


  return (<Container maxW={'1140px'} px={4}>
    <Flex
    h={16}
    alignItems={"center"}
    justifyContent={'space-between'}
    flexDIR={{
      base:"column",
      sm:"row"
    }}
    >
      <HStack>
      <Icon as={FaLeaf} boxSize={6} color='teal.400' /> 
    <Text
  bgGradient='linear(to-l, teal.400, cyan.400)'
  bgClip='text'
  fontSize={{base:'22',sm :'28'}}
  fontWeight='extrabold'
>
  <Link to={"/"}>Track My WishList</Link>
</Text>

</HStack>

<HStack spacing={2} alignItems={'center'}>
  <Link to={"/create"}>
  <Button>
    <PlusSquareIcon fontSize={20}/>
  </Button>
  </Link>
  <Button onClick={toggleColorMode}>
    {colorMode === "light" ? <IoMoon /> : <LuSun size="20" /> }
  </Button>
</HStack>

    </Flex>

    <Box 
        
        height="2px" 
        backgroundColor="gray.400" // Change this color as needed
        margin="0 auto" // Center the line
        mt={2} // Margin on top
      />
  </Container>
)};

export default Navbar