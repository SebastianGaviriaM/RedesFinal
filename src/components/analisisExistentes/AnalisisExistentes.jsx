import React, { useEffect, useState } from "react";
import { Box, Icon, Heading, Button, Text, Input, Image} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import estrella from '../../content/mi_grafico0.png'

const AnalisisExistentes = ()=>{

    const [listaTwits, setListaTwits] = useState([]);
    const [listaImagenes, setListaImagenes] = useState([]);

    useEffect(()=>{
        const twits = localStorage.getItem('twits');
        const parsedTwits = twits ? JSON.parse(twits) : [];
        setListaTwits(parsedTwits);

        const imagenes = localStorage.getItem('imagenes');
        const parsedImagenes =  imagenes ? JSON.parse(imagenes) : [];
        setListaImagenes(parsedImagenes);
        
    }, [])



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


        <Box mt='30vh' display='flex' w='70vw' ml='15vw' flexWrap='wrap' justifyContent='space-evenly'>

            {listaTwits.length>0 && listaTwits.map((element, index) => {

                const imageUrl = require(`../../content/mi_grafico${listaImagenes[index]}.png`);
                return (
                    <Box key={index} display='flex' flexDirection='column' alignItems='center'>
                    <Image src={imageUrl} w='30vw' h='15vw' />
                    <Heading size='lg'>{element}</Heading>
                    </Box>
                );
                })}

        </Box>
        <Button width='6vw' ml='47vw' mt='5vh'>Eliminar</Button>
    </Box>
    );
}

export default AnalisisExistentes;