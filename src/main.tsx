import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme.ts';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { BrowserRouter } from 'react-router-dom'; 
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* 1. LanguageProvider envuelve todo */}
      <LanguageProvider>
        {/* 2. BrowserRouter envuelve la App */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);