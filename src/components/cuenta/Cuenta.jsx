import React from "react";
import { Box, Icon, Heading, Button, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Cuenta = ()=>{

    const navigate = useNavigate();

    const handleRedirect = (ruta)=>{
        navigate(ruta);
    }

    return(
        <Box h='70vh' mt='15vh'>
            <Box display='flex' justifyContent='space-between' padding='2vw' alignItems='center'>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='start'>
                    <Icon viewBox='0 0 200 200' boxSize={75} color='orange.500'>
                        <path
                        fill='currentColor'
                        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                        />
                    </Icon>
                    <Heading>VoxPopuliAi</Heading>
                </Box>

                <Button colorScheme='orange'>LogOut</Button>
            </Box>

            <Box display='flex' flexDirection='column' justifyContent='space-between' mt='3vh' alignItems='center'>
                <Heading>Bienvenido a tu panel de control</Heading>
                <Text fontSize='2xl' color='grey'>Desde este lugar podras crear nuevos analisis y nuevas viusalizaciones sobre un tema especifico </Text>
            </Box>

            <Box ml='35vw' display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-between' mt='5vh' alignItems='center' width='30vw' h='10vh'>
                <Button  width='11vw' h='4vh' colorScheme='orange' onClick={()=>{handleRedirect('/nuevoAnalisis')}}>Nuevo análisis</Button>
                <Button  width='11vw' h='4vh' colorScheme='orange' >Nueva visualización</Button>
                <Button  width='11vw' h='4vh' colorScheme='orange' mt='3vh' onClick={()=>{handleRedirect('/analisisExistentes')}}>Análisis existentes</Button>
                <Button  width='11vw' h='4vh' colorScheme='orange' mt='3vh' onClick={()=>{handleRedirect('/visualizacionesExistentes')}}>Visualizaciones existentes</Button>
            </Box>


        </Box>
    )
}

export default Cuenta;