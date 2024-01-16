// Navbar.js

import React from 'react';
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Link,  Heading } from '@chakra-ui/react';
import CircumIcon from "@klarr-agency/circum-icons-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      {/* Button to open the drawer */}
      <Link ref={btnRef} variant={'solid'} onClick={onOpen} >
        Menu
      </Link>

      {/* Drawer (Navbar) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
  
          <DrawerHeader display={"flex"} bg={"#070811"} color={"teal"} shadow={"1px 2px 3px teal"} p={4} letterSpacing={"3px"} fontSize={"30px"}size="2x" >Hello Buddy ! <CircumIcon p={1} name="face_smile" color={"#ffc505"} /></DrawerHeader>
          <DrawerBody shadow={"1px 2px 3px teal"} bg={"#070811"} color={"#cccccc"} >
            {/* Navbar Content */}
            {/* Add your navbar links or components here */}
            <Box display={"flex"} p={"5px"}>
              <CircumIcon name="home" />
              <Link href='/' p={2}>Home</Link>
            </Box>
            <Box display={"flex"} p={"5px"}>
              <CircumIcon name="stream_on" />
              <Link href='/' p={2}>Daily Update</Link>
            </Box><Box display={"flex"} p={"5px"}>
              <CircumIcon name="hashtag" />
              <Link href='https://twitter.com/RaviTom81074249' target='_blank' p={2}>Code Snippets </Link>
            </Box><Box display={"flex"} p={"5px"}>
              <CircumIcon name="text_align_center" />
              <Link href='/' p={2}>News Letter</Link>
            </Box>
            <Heading fontSize={"xl"} color={"teal"}>Social</Heading>
            <Box display={"flex"} p={"5px"}>
            <FontAwesomeIcon  icon={faInstagram}size='2x' color='#af124e' />
              <Link href='https://www.instagram.com/im_rtomer/' p={2}>Instagram</Link>
            </Box><Box display={"flex"} p={"5px"}>
            <FontAwesomeIcon  icon={faTwitter}size='2x' color='blue' />
              
              <Link href='https://twitter.com/RaviTom81074249' target='_blank' p={2}>Twitter (X)</Link>
            </Box><Box display={"flex"} p={"5px"}>
            <FontAwesomeIcon  icon={faGithub}size='2x' color='white' />
              
              <Link href='https://github.com/raviking' target='_blank' p={2}>GitHub</Link>
            </Box><Box display={"flex"} p={"5px"}>
            <FontAwesomeIcon  icon={faLinkedin}size='2x' color='blue' />
              
              <Link href='https://www.linkedin.com/in/rtomeredu47/' p={2}>Linked  In</Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
