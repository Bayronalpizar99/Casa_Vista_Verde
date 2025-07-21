// src/components/Footer.tsx
import { Box, Container, Flex, HStack, IconButton, Image, Link, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// --- MODIFICACIÓN AQUÍ ---
// Se cambia la importación del logo para el tema claro a "CASA3.png"
import logoLight from '../assets/CASA3.png';
import logoDark from '../assets/CASA2.png';

export function Footer() {
  const bgColor = useColorModeValue('light.primary', 'dark.background');
  const textColor = useColorModeValue('light.background', 'dark.primary');
  const logoSrc = useColorModeValue(logoLight, logoDark);

  return (
    <Box bg={bgColor} color={textColor}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          
          <VStack spacing={0} align="center" mb={{ base: 8, md: 0 }}>
            {/* El tamaño se mantiene como lo tenías en tu código */}
            <Image src={logoSrc} h="258px" alt="Logo Casa Vista Verde" />
            <HStack spacing={5} mt="-70px">
              <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook />} />
              <IconButton as="a" href="#" aria-label="Instagram" icon={<FaInstagram />} />
              <IconButton as="a" href="#" aria-label="WhatsApp" icon={<FaWhatsapp />} />
            </HStack>
          </VStack>
          
          {/* Se mantiene el margen superior que ajustaste */}
          <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={24}>
            <Text fontWeight="bold">Contacto</Text>
            <Text>Email: info@casavistaverde.com</Text>
            <Text>Teléfono: (+506) 2222-2222</Text>
            <Text>WhatsApp: (+506) 8888-8888</Text>
          </VStack>

          {/* Se mantiene el margen superior que ajustaste */}
          <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={24}>
            <Text fontWeight="bold">Dirección</Text>
            <Text>Calle Principal, 100m al este</Text>
            <Text>Tapezco, Zarcero</Text>
            <Text>Costa Rica</Text>
          </VStack>

        </Flex>
        
        <Box borderTopWidth={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.700', 'gray.200')} mt={8} pt={6}>
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} Casa Vista Verde. Todos los derechos reservados. | <Link href="#">Política de Privacidad</Link>
          </Text>
        </Box>

      </Container>
    </Box>
  );
}