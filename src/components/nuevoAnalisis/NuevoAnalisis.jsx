import React from 'react';
import { Box, Icon, Heading, Button, Text, Input, Checkbox, Card} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const NuevoAnalisis = () =>{

    const navigate = useNavigate();

    const handleRedirect =()=>{
        navigate('/cuenta');
    }
    return(
        <Box>
            <Box display='flex' justifyContent='start' padding='2vw' alignItems='center'>
                    <Heading onClick={handleRedirect}>VoxPopuliAi</Heading>
            </Box>

            <Box display='flex' flexDirection='column' justifyContent='space-between' mt='2vh' alignItems='center' w='60vw' ml='20vw'>
                <Heading>Bienvenido a tu nuevo analisis</Heading>
                <Text fontSize='2xl' color='grey' textAlign='center' mt='4vh'>Ingresa la tematica que te interes y identificaremos 
                los hashtags mas relevantes en twiter sobre ella, ademas, si crees que hizo falta alguno 
                lo podras agregar manualmente o no utilizar alguno, luego de elegirlos presiona el boton 
                VoxPopuli para realizar el analisis.</Text>
            </Box>

            <Box display='flex' width='30vw' justifyContent='space-between' ml='35vw' mt='5vh' >
                <Input variant='filled' placeholder='Agrega tu búsqueda' w='12vw'/>
                <Button  width='12vw' colorScheme='orange'>Analizar</Button>
            </Box>
            <Box display='flex' width='30vw' flexDirection='column' justifyContent='space-between' ml='35vw' mt='5vh' alignItems='center'>
                <Heading>Hashtags incluidos</Heading>
                <Card w='7vw' padding='0.5vw' alignItems='start' mt='2vh'>
                    <Checkbox >first</Checkbox>
                </Card>
                <Card w='7vw' padding='0.5vw' alignItems='start' mt='2vh'>
                    <Checkbox >Second</Checkbox>
                </Card>
                <Card w='7vw' padding='0.5vw' alignItems='start' mt='2vh'>
                    <Checkbox >Third</Checkbox>
                </Card>
            </Box>
        </Box>

        
    )
}


export default NuevoAnalisis;