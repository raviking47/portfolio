import { ArrowLeftIcon, ArrowRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import Sidebar from './Sidebar'

export default function Navbar() {
  return (
    <Box shadow={"1px 2px 3px teal"} p={3}>
      <Flex align="center">
        {/* Logo */}
        <Box>
        <TriangleDownIcon color={"teal"}/>
        <ArrowLeftIcon/>
        
        <ArrowRightIcon/>
        <TriangleUpIcon  color={"teal"} />
        
        </Box>
        <Spacer />

        {/* Contact Button */}
        <Button colorScheme="teal" variant="outline">
          <Sidebar/>
        </Button>
      </Flex>
    </Box>
  )
}
