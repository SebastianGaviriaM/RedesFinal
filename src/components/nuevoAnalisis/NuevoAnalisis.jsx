import React, {useState, useEffect} from 'react';
import { Box, Heading, Button, Text, Input, Spinner} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const NuevoAnalisis = () =>{
    const [texto, setTexto] = useState('Recolectando los tweets...');
    const [contador, setContador] = useState(0);
    const [activado, setActivado] = useState(false);
    const [busqueda, setBusqueda] = useState(false);

    const [inputmens, setInputmens] = useState('');

    const lista = ['Recolectando los tweets...', 'Procesando los tweets...', 
        'Analizando el sentimiento y excluyendo bots...', 
        'Creando el reporte gráfico...'];
    useEffect(() => {
    if (activado) {
        const interval = setInterval(() => {
        setContador((prevContador) => prevContador + 1);
        
        setTexto(lista[contador])
        }, 5000);

        if (contador === 2) {
        // Reiniciar el contador y desactivar después de 15 segundos
        setTimeout(() => {
            setContador(0);
            setActivado(false);
            setTexto('Recolectando los tweets...')
            setBusqueda(false);
        }, 15000);
        }

        return () => {
        clearInterval(interval);
        };
    }
    }, [contador, activado]);



    const handleButtonClick = () => {
        setContador(0);
        setActivado(true);
        setBusqueda(true);

        const randomNumber = Math.floor(Math.random() * 1999) + 1;
 

        const twits = localStorage.getItem('twits');
        const listaTwits = twits ? JSON.parse(twits) : [];

        listaTwits.push(inputmens);
        localStorage.setItem('twits', JSON.stringify(listaTwits));

        const imagenes = localStorage.getItem('imagenes');
        const listaImagenes = imagenes ? JSON.parse(imagenes) : [];
        listaImagenes.push(randomNumber);
        localStorage.setItem('imagenes', JSON.stringify(listaImagenes));
    };

    const handleChange = (event)=>{
        setInputmens(event.target.value);
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
                <Heading>Bienvenido a tu nuevo analisis</Heading>
                <Text fontSize='2xl' color='grey' textAlign='center' mt='4vh'>Ingresa la tematica que te interes y identificaremos 
                los hashtags mas relevantes en twiter sobre ella, ademas, si crees que hizo falta alguno 
                lo podras agregar manualmente o no utilizar alguno, luego de elegirlos presiona el boton 
                VoxPopuli para realizar el analisis.</Text>
            </Box>

            <Box display='flex' width='30vw' justifyContent='space-between' ml='35vw' mt='5vh' >
                <Input variant='filled' placeholder='Agrega tu búsqueda' w='12vw' onChange={handleChange}/>
                <Button  width='12vw' colorScheme='orange' onClick={handleButtonClick}>Analizar</Button>
            </Box>
            <Box w='10vw' ml='45vw' display={!busqueda ? 'none' : 'flex'} flexDirection='column' alignItems='center'  >
                <Spinner mt='5vh' width='2vw' height='2vw'/>
                <Text>{texto}</Text>
            </Box>
            
        </Box>

        
    )
}


export default NuevoAnalisis;