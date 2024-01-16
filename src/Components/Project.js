import {  Image, Heading, Flex } from '@chakra-ui/react'
import React from 'react'
import image from './Image/1.png'
import image1 from './Image/image1.png'
import image2 from './Image/image2.png'
import image3 from './Image/image3.png'

export default function Project() {
    return (
        <> 
      <Heading textAlign={'center'}  size={'sm'}>Programming is the art of telling another human being what one wants the computer to do. </Heading>

            <Heading p={2} textAlign={'left'} size={'lg'}>Project</Heading>
            <Flex flexWrap="wrap" justifyContent={'center'}                 >

                <div className="card">
                    <Image p={2} borderWidth={"2px"} src={image} />
                    <div className="card__content">
                        <p className="card__title">Vlab (Merge Sort)
                        </p><p className="card__description">By developing this V lab Project, I demonstrated proficiency in JavaScript programming, problem-solving,
                            and logical thinking. This project is develop under my college faculty and V Lab Community For Students</p>
                    </div>
                </div>
                <div className="card">
                    <Image p={2} borderWidth={"2px"} src={image1} />
                    <div className="card__content">
                        <p className="card__title">E-com DeshBorad
                        </p><p className="card__description">The E-deshboard web app is powerful and user-friendly platform built using Node.js, React.js, and Mon-
                            goDB. It aims to provide users with a comprehensive digital dashboard experience.</p>
                    </div>
                </div>
                <div className="card">
                    <Image p={2} borderWidth={"2px"} src={image2} />
                    <div className="card__content">
                        <p className="card__title">Chat app
                        </p><p className="card__description">Creating a dynamic chat app using MERN stack (MongoDB, Express.js, React, Node.js) with real-time up-
                            dates. Implementing Stock.io integration for live stock data, enhancing user engagement and providing
                           </p>
                    </div>
                </div>
                <div className="card">
                    <Image p={2} borderWidth={"2px"} src={image3} />
                    <div className="card__content">
                        <p className="card__title">Online Complier
                        </p><p className="card__description">Developing a MERN Stack compiler project, integrating MongoDB, Express.js, React, and Node.js. This web-based compiler facilitates code execution, error detection, and output display, coding experience.</p>
                    </div>
                </div>



            </Flex>
        </>
    )
}
