import { IconButton, SlideFade, useColorModeValue } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonBg = useColorModeValue('light.accent', 'dark.accent');
  const buttonColor = useColorModeValue('light.primary', 'dark.primary');

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <SlideFade in={isVisible} offsetY="20px">
      <IconButton
        aria-label="Volver arriba"
        icon={<ArrowUpIcon />}
        onClick={scrollToTop}
        position="fixed"
        bottom={{ base: "16px", md: "20px" }}
        right={{ base: "16px", md: "20px" }}
        isRound={true}
        size={{ base: "md", md: "lg" }}
        bg={buttonBg}
        color={buttonColor}
        zIndex={9999} // Z-index muy alto para estar siempre encima
        boxShadow="lg"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
        }}
        // Asegurar que sea perfectamente redondo
        borderRadius="full"
        width={{ base: "48px", md: "56px" }}
        height={{ base: "48px", md: "56px" }}
        minW={{ base: "48px", md: "56px" }}
        minH={{ base: "48px", md: "56px" }}
        // Mejora la experiencia táctil
        _active={{
          transform: 'translateY(0px)',
          boxShadow: 'md',
        }}
        transition="all 0.2s ease-in-out"
      />
    </SlideFade>
  );
}