import React from 'react'
import image1 from './Image/aws.png'
import image2 from './Image/devops.png'
import image3 from './Image/web3.jpeg'
import { Button, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import cv from './Image/CV_ravitomer.pdf'
export default function Footer() {
 

  const handleButtonClick = () => {
    window.open(cv)
  };
  return (

<div>
<Heading textAlign={'right'} mr={3} size={'lg'}>Current Learning and Working Tech</Heading>


      <Flex p={3} flexWrap="wrap" justifyContent={'right'}                 >
       
        <div className="card3">
          <Image p={2} borderWidth={"2px"} src={image1} />
          <div  >
           
          </div>
        </div>
        <div className="card3">
          <Image p={2} borderWidth={"2px"} src={image2} />
         
        </div>
        <div className="card3">
          <Image p={2} borderWidth={"2px"} src={image3} />
          
        </div>
        </Flex>
     
        <Flex borderWidth={'2px'} borderColor={'teal'}  flexWrap="wrap"  justifyContent={'right'}   >
        <Button colorScheme='teal' p={5} m={4} onClick={handleButtonClick}>My CV</Button>
        <Button colorScheme='teal' p={5} m={4}> 
        <Link  target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLScje-8aeJrD_ZyJ6wiDW6HylLNBdLx1otU3SFlwYNxFwgMTrQ/viewform?usp=sf_link' > Query form</Link> 
     </Button>
     <Text  p={4} m={2}>@ BY Ravi Tomer </Text>
        </Flex>

    </div>
  )
}
