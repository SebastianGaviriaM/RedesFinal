import React from 'react';
import { Box, Heading, Text, Image, Icon, Button} from '@chakra-ui/react';
import style from './landPage.module.css';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const LandPage = () =>{
    const navigate = useNavigate();

    const handleInicioSesion = ()=>{
        navigate('/login');
    }

    return(
    
    <Box className={style.conteinerPrincipal} h='70vh' mt='15vh'>
        <Box display='flex' justifyContent='space-between' padding='2vw'>
            <Icon viewBox='0 0 200 200' boxSize={75} color='orange.500'>
                <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
            </Icon>
            

            <Button colorScheme='orange' className={style.fondoBoton} onClick={handleInicioSesion}>SING-IN</Button>

        </Box>
        <Box w='80vw' ml='10vw' display='flex' justifyContent='space-evenly'>
            <Box display='flex' flexDirection='column' width='40vw'>
                <Heading>Bienvenido a VoxPopuliAi</Heading>
                <Text textAlign="justify" w='30vw'>Nuestro compromiso es crear una sociedad mas democratica a 
                    traves de una herramienta que le permita a las entidades 
                    gubernamentales tener un análisis automatizado de la opinión 
                    de los ciudadanos para generar una participacion real y mas directa.</Text>
            </Box>
            <Image src={logo} w='20vw' alt='VoxPopuli' />
        </Box>

    </Box>
    
    )

}


export default LandPage;
