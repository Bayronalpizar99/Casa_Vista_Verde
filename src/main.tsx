// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme.ts';
import { LanguageProvider } from './context/LanguageContext.tsx'; // Importa el proveedor

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LanguageProvider> {/* Añade el proveedor aquí */}
        <App />
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);