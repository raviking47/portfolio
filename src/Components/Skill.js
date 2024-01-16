import { Box,  Flex, Heading, List,  ListItem  } from '@chakra-ui/react'
import { faAirbnb, faCss3, faFigma, faGit, faGithub, faHtml5,  faJava, faJs, faLinux, faNode, faNodeJs, faPython, faReact, faResearchgate, faStackOverflow, faUikit, faUnity } from '@fortawesome/free-brands-svg-icons'
import {  faC, faCalculator, faCloud, faCodeCompare,  faM, faN, faNoteSticky, faP, faPlus, faPooStorm, faPortrait,  faS, faStopwatch, faV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Skill() {
  return (
    <div>
      
      <Heading textAlign={'left'} ml={3} size={'lg'}>What I know</Heading>
      <Flex flexWrap="wrap" justifyContent={{ base: 'space-between', sm: 'space' }} >

        <Box className='card1' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}>Frontend  </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faHtml5} size='1x' color='orange' />

              HTML
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faCss3} size='1x' color='skyblue' />

              CSS
            </ListItem><ListItem    >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faUikit} size='1x' color='teal' />
              Chakra Ui
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faUnity} size='1x' color='blue' />
              Material Ui
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faAirbnb} size='1x' color='red' />
              Tailwind
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faJs} size='1x' color='Yellow' />
              JavaScript
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faReact} size='1x' color='skyblue' />
              React JS
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faN} size='1x' color='black' />
              Next JS
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
        <Box className='card1' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}>Backend  </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faNode} size='1x' color='green' />

              Node JS
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faNodeJs} size='1x' color='skyblue' />

              Express JS
            </ListItem><ListItem    >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faResearchgate} size='1x' color='teal' />
              REST API
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
        <Box className='card1' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}>Database  </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faS} size='1x' color='orange' />

              MySql
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faP} size='1x' color='skyblue' />

              PostgreSQL
            </ListItem><ListItem    >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faM} size='1x' color='teal' />
              MongoDB
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
        <Box className='card1' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}>Other Tech  </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faGit} size='1x' color='red' />

              Git
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faGithub} size='1x' color='black' />

              GitHube
            </ListItem><ListItem    >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faV} size='1x' color='teal' />
              VS Code
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faFigma} size='1x' color='blue' />
              Figma
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faPooStorm} size='1x' color='red' />
              Postman API
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faLinux} size='1x' color='Yellow' />
              Linux
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
        <Box className='card1' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}> Languages  </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faJava} size='1x' color='orange' />

              Java
            </ListItem>
            <ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faPlus} size='1x' color='skyblue' />

              C++
            </ListItem><ListItem    >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faC} size='1x' color='teal' />
              C
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faPython} size='1x' color='blue' />
              Python
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faJs} size='1x' color='red' />
              JavaScript
            </ListItem><ListItem>
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faStackOverflow} size='1x' color='Yellow' />
              DSA
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
        <Box className='card2' >
          <Heading textAlign={'left'} color={'green.500'} p={3} size={'sm'}>Minor Project </Heading>
          <List textAlign={'left'} spacing={3}>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faNoteSticky} size='1x' color='grey' />
              Note App
            </ListItem>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faPortrait} size='1x' color='grey' />
              Portfolio
            </ListItem>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faCalculator} size='1x' color='grey' />
              Calculator
            </ListItem>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faStopwatch} size='1x' color='grey' />
              Stop Watch
            </ListItem>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faCodeCompare} size='1x' color='grey' />
              AI helper
            </ListItem>
            <ListItem >
              <FontAwesomeIcon style={{ marginRight: '7px' }} icon={faCloud} size='1x' color='grey' />
              Weather App
            </ListItem>
            {/* You can also use custom icons from react-icons */}

          </List>
        </Box>
      </Flex>

    </div>
  )
}
