import { Card, CardBody, Heading,  Stack,  Button, Box, Center, Link } from '@chakra-ui/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
export default function Title() {
    return (

       <Center>

        <Box p={"40px"} maxW={{base:"100%",sm:"80%"}} >
            <Card

                bg={'#070812'} 
                color={"white"}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                
            >
                

                <Stack>
                    <CardBody ml={5}  >
                        <Heading letterSpacing={"5px"} size='2xl'>Ravi Tomer</Heading>

                        <Heading size={'sm'} letterSpacing={"5px"} > Full Stack Developer  <br />
                            Google Certified Python Developer</Heading>
                            <Button variant={'ghost'} ml={2} acolor={"darkblue"} >
                        <FontAwesomeIcon icon={faInstagram} size='2x' color='#af124e' style={{marginTop:'2px'}} /> <Link ml={2} href='http://www.instagram.com/im_rtomer' target='_blank'>Catch me on Instagram</Link></Button> </CardBody>


                </Stack>
            </Card></Box>
       </Center>

    )
}
