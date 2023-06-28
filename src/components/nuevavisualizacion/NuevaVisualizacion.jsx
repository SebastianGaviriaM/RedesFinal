import React from "react";
import { Box, Icon, Heading, Button, Text, Input, Image} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const NuevaVisualizacion = ()=>{
    const navigate = useNavigate();


    const handleRedirect = ()=>{
        navigate('/cuenta');
    }
    return(
        <Box>
            <Box display='flex' justifyContent='start' padding='2vw' alignItems='center'>
                    <Heading onClick={handleRedirect}>VoxPopuliAi</Heading>
            </Box>

            <Box display='flex' flexDirection='column' justifyContent='space-between' mt='2vh' alignItems='center' w='60vw' ml='20vw'>
                <Heading>Elige alguno de los analisis que tengas guradado para generar una visualizancon</Heading>
            </Box>
        </Box>
    )
}


export default NuevaVisualizacion;