import { Box, Container, Flex, HStack, IconButton, Image, Link, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import logoLight from '../assets/CASA3.png';
import logoDark from '../assets/CASA2.png';

export function Footer() {
  // Aplicando los colores definidos en tu theme.ts
  const bgColor = useColorModeValue('light.background', 'dark.background');
  const textColor = useColorModeValue('light.primary', 'dark.text');
  const headingColor = useColorModeValue('light.text', 'dark.primary');
  const borderColor = useColorModeValue('light.secondary', 'dark.secondary');
  const logoSrc = useColorModeValue(logoLight, logoDark);
  const iconBg = useColorModeValue('white', 'gray.700'); // Fondo para los botones de íconos

  return (
    <Box bg={bgColor} color={textColor}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          
          <VStack spacing={0} align="center" mb={{ base: 8, md: 0 }}>
            <Image src={logoSrc} h="258px" alt="Logo Casa Vista Verde" />
            <HStack spacing={5} mt="-70px">
              {/* --- INFORMACIÓN REAL AÑADIDA --- */}
              <IconButton 
                as="a" 
                href="https://www.facebook.com/profile.php?id=100088581027543&mibextid=ZbWKwL"
                target="_blank" // Abrir en nueva pestaña
                aria-label="Facebook" 
                icon={<FaFacebook />} 
                isRound={true}
                bg={iconBg}
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
              />
              <IconButton 
                as="a" 
                href="https://instagram.com/vista.verde2023"
                target="_blank" // Abrir en nueva pestaña
                aria-label="Instagram" 
                icon={<FaInstagram />} 
                isRound={true}
                bg={iconBg}
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
              />
              <IconButton 
                as="a" 
                href="https://wa.me/50683154952" // Formato de enlace para WhatsApp
                target="_blank" // Abrir en nueva pestaña
                aria-label="WhatsApp" 
                icon={<FaWhatsapp />} 
                isRound={true}
                bg={iconBg}
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
              />
            </HStack>
          </VStack>
          
          <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={{base: 0, md: 24}}>
            <Text fontWeight="bold" color={headingColor}>Contacto</Text>
            <Text>Email: casavistaverde2025@gmail.com</Text>
            <Text>Teléfono: (+506) 2222-2222</Text>
            {}
            <Text>WhatsApp: (+506) 8315-4952</Text>
          </VStack>

          <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={{base: 8, md: 24}}>
            <Text fontWeight="bold" color={headingColor}>Dirección</Text>
            <Text>Calle Principal, 100m al este</Text>
            <Text>Tapezco, Zarcero</Text>
            <Text>Costa Rica</Text>
          </VStack>

        </Flex>
        
        <Box borderTopWidth={1} borderStyle={'solid'} borderColor={borderColor} mt={8} pt={6}>
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} Casa Vista Verde. Todos los derechos reservados. | <Link href="#" color={headingColor}>Política de Privacidad</Link>
          </Text>

          <Text textAlign="center" fontSize="sm" mt={2}>
            Desarrollado por{' '}
            <Link 
              href="https://github.com/Bayronalpizar99" 
              isExternal
              fontWeight="bold"
              color={headingColor}
              _hover={{ textDecoration: 'underline' }}
            >
              @Bayronalpizar99
            </Link>
          </Text>
        </Box>

      </Container>
    </Box>
  );
}
