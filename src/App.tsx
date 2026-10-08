import Hero from './components/Hero';
import PesoDoVoto from './components/PesoDoVoto';
import Reflita from './components/Reflita';
import ChamadaFinal from './components/ChamadaFinal';
import MapaAbstencao from './components/MapaAbstencao';
import Documentos from './components/Documentos';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <PesoDoVoto />
        <MapaAbstencao />
        <Reflita />
        <Documentos />
        <ChamadaFinal />
      </main>
      <Footer />
    </>
  );
}
