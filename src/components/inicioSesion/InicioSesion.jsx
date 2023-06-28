import React, {useState} from "react";
import { Box, Heading, Text, Icon, Button, 
    Divider, Card, CardBody, Input, InputRightElement, InputGroup} from '@chakra-ui/react';
import style from './inicioSesion.module.css';
import { useNavigate } from "react-router-dom";

const InicioSesion = ()=>{

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [correo, setCorreo] = useState(''); 


    const handleClick = () => setShow(!show);

    const handleChangeCorreo = (event)=>{
        setCorreo(event.target.value)
    }


    const handleSendInicioSesion = ()=>{
        localStorage.setItem('twits', []);
        localStorage.setItem('imagenes', []);
        navigate('/cuenta');
    }


    
    return(
    <Box className={style.conteinerPrincipal} h='70vh' mt='15vh'>
        <Box display='flex' justifyContent='start' padding='2vw' alignItems='center'>
            <Icon viewBox='0 0 200 200' boxSize={75} color='orange.500'>
                <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
            </Icon>
            <Heading>VoxPopuliAi</Heading>
        </Box>

        <Box w='80vw' ml='10vw' display='flex' justifyContent='space-around'>
            <Box display='flex' flexDirection='column' width='40vw' h='30vh' justifyContent='space-evenly'>
                <Heading size='3xl'>Ingresa a tu cuenta</Heading>
                <Text fontSize='2xl' color='grey'>Usa tu cuenta de correo institucional terminada en .gov o parecido para iniciar sesion</Text>
                <Divider orientation='horizontal' />
                <Text fontSize='2xl' color='grey'>Para esta versión de la aplicación, puedes ingresar las credenciales que quieras, serán almacenadas localmente</Text>
            </Box>
            <Card padding='2vw'>
                <CardBody>
                    <Heading size='lg'>Inicio de sesión</Heading>
                    <Input htmlSize={4} width='20vw' mt='4vh' placeholder="Ingresa tu correo" onChange={handleChangeCorreo}/>
                    <InputGroup size='md' mt='2vh' width='20vw'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Ingresa tu contraseña'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button  size='sm' mr='0.2vw' onClick={handleClick}>
                            {show ? 'Ocultar' : 'Mostrar'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button colorScheme='gray' mt='2vh' onClick={handleSendInicioSesion}>Iniciar Sesión</Button>
                </CardBody>
            </Card>

        </Box>
    </Box>
    )
}

export default InicioSesion