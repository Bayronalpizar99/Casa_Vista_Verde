// src/App.tsx
import { Box } from '@chakra-ui/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ubicacion } from './components/Ubicacion';
import { Habitaciones } from './components/Habitaciones';
import { Experiencias } from './components/Experiencias';
import { Precios } from './components/Precios';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton'; 

function App() {
  return (
    <Box bg="background">
      <Navbar />
      <main>
        {/* --- MODIFICACIÓN AQUÍ --- */}
        {/* Se reordenaron los componentes para que coincidan con el Navbar. */}
        <Hero />
        <Habitaciones />
        <Experiencias />
        <Ubicacion />
        <Precios />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTopButton />
    </Box>
  );
}

export default App;
