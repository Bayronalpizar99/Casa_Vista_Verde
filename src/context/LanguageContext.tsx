// src/context/LanguageContext.tsx
import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'; // <-- Cambio aquí
import { translations } from '../translations';

// Define el tipo para el contexto
type Language = 'es' | 'en';
interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.es) => string;
}

// Crea el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
  };

  const t = (key: keyof typeof translations.es): string => {
    return translations[lang][key];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};