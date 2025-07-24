import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';
import videoBg from '../assets/2K_casas.mp4';

export function Hero() {
  const { t } = useLanguage();

  const buttonBg = useColorModeValue('light.accent', 'dark.accent');
  const buttonColor = useColorModeValue('light.primary', 'dark.primary');

  const heroTextColor = useColorModeValue('white', '#c2c8d6');

  return (
    <Box
      id="inicio"
      h="100vh"
      w="full"
      position="relative"
      overflow="hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline 
        src={videoBg} 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '50%',
          left: '50%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        zIndex={1}
      />
      
      <Flex
        h="100%"
        w="100%"
        align="center"
        justify="center"
        position="relative"
        zIndex={2}
      >
        <VStack spacing={6} textAlign="center" color={heroTextColor}>
          <Heading as="h1" size={{ base: '2xl', md: '4xl' }} fontWeight="bold">
            {t('heroTitle')}
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW="2xl">
            {t('heroSubtitle')}
          </Text>
          <ScrollLink to="contacto" smooth={true} duration={500} offset={-80}>
            <Button 
              size="lg" 
              bg={buttonBg}
              color={buttonColor}
              px={8}
              _hover={{
                opacity: 0.9
              }}
            >
              {t('reservarAhora')}
            </Button>
          </ScrollLink>
        </VStack>
      </Flex>
    </Box>
  );
}