import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ubicacion } from './components/Ubicacion';
import { Habitaciones } from './components/Habitaciones';
import { Experiencias } from './components/Experiencias';
import { Precios } from './components/Precios';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PoliticaPrivacidad } from './components/PoliticaPrivacidad';
import { ScrollToTop } from './components/ScrollToTop'; 

function App() {
  return (
    <Box bg="background">
      <Navbar />
      <ScrollToTop /> {}

      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Habitaciones />
              <Experiencias />
              <Ubicacion />
              <Precios />
              <CallToAction />
            </>
          }
        />

        {/* Página de política de privacidad */}
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </Box>
  );
}

export default App;