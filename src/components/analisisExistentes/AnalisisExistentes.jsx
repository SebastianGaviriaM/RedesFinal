import React, { useEffect } from "react";
import { Box, Icon, Heading, Button, Text, Input, Image} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import estrella from '../../assets/estrella.png'

const AnalisisExistentes = ()=>{

    let listaTwits;
    let listaImagenes;

    useEffect(()=>{
        const twits = localStorage.getItem('twits');
        listaTwits = twits ? JSON.parse(twits) : [];

        const imagenes = localStorage.getItem('imagenes');
        listaImagenes = imagenes ? JSON.parse(imagenes) : [];

        
    }, [])
    if(listaTwits===undefined){
        listaTwits=[];
    }
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
            <Heading>Elige alguno de tus analisis existentes</Heading>
        </Box>


        <Box mt='30vh' display='flex' w='70vw' ml='15vw' justifyContent='space-evenly'>

            {listaTwits.map((element, index) => {
                return (
                    <Box key={index} display='flex' flexDirection='column' alignItems='center'>
                    <Image src={estrella} w='5vw' />
                    <Heading size='lg'>{element}</Heading>
                    </Box>
                );
                })}

            <Box display='flex' flexDirection='column' alignItems='center'>
                <Image src={estrella} w='5vw'></Image>
                <Heading size='lg'>Analisis 1</Heading>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Image src={estrella} w='5vw' ></Image>
                <Heading size='lg'>Analisis 2</Heading>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Image src={estrella} w='5vw'></Image>
                <Heading size='lg'>Analisis 3</Heading>
                
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Image src={estrella} w='5vw'></Image>
                <Heading size='lg'>Analisis 4</Heading>
                
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Image src={estrella} w='5vw'></Image>
                <Heading size='lg'>Analisis 5</Heading>
                
            </Box>

        </Box>
        <Button width='6vw' ml='47vw' mt='5vh'>Eliminar</Button>
    </Box>
    );
}

export default AnalisisExistentes;