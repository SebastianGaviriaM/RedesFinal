import { Route, Routes} from 'react-router-dom';
import LandPage from './components/landPage/Landpage';
import InicioSesion from './components/inicioSesion/InicioSesion';
import Cuenta from './components/cuenta/Cuenta';
import NuevoAnalisis from './components/nuevoAnalisis/NuevoAnalisis';
import AnalisisExistentes from './components/analisisExistentes/AnalisisExistentes';
import VisualizacionesExistentes from './components/visualizacionesExistentes/VisualizacionesExistentes';
import NuevaVisualizacion from './components/nuevavisualizacion/NuevaVisualizacion';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<LandPage/>}/>
        <Route path='/login' element={<InicioSesion/>}/>
        <Route path='/cuenta' element={<Cuenta/>}/>
        <Route path='nuevoAnalisis' element={<NuevoAnalisis />} />
        <Route path='analisisExistentes' element={<AnalisisExistentes />} />
        <Route path='visualizacionesExistentes' element={<VisualizacionesExistentes />} />
        <Route path='nuevaVisualizacion' element={<NuevaVisualizacion />} />
      </Routes>
    </div>
  );
}

export default App;
