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
        bottom="20px"
        right="20px"
        isRound={true}
        size="lg"
        bg={buttonBg}
        color={buttonColor}
        zIndex="sticky" 
        boxShadow="lg"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
        }}
      />
    </SlideFade>
  );
}