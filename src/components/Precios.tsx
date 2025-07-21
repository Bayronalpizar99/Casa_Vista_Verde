import { Box, Heading, Text, VStack, useColorModeValue, List, ListItem, ListIcon, Icon, Divider, HStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionVStack = motion(VStack);

const PriceLineItem = ({ label, value }: { label: string; value: string }) => {
  const labelColor = useColorModeValue('light.text', 'dark.text');
  const valueColor = useColorModeValue('light.primary', 'dark.primary');

  return (
    <Flex justify="space-between" w="100%" py={3}>
      <Text color={labelColor}>{label}</Text>
      <Text fontWeight="bold" fontSize="lg" color={valueColor}>{value}</Text>
    </Flex>
  );
};

export function Precios() {
  const bgColor = useColorModeValue('light.background', 'dark.background');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const priceBoxBg = useColorModeValue('white', 'transparent');
  const infoIconColor = useColorModeValue('light.secondary', 'dark.secondary');
  const checkIconColor = useColorModeValue('light.accent', 'dark.accent');
  const linkColor = useColorModeValue('light.accent', 'dark.accent');
  const dividerColor = useColorModeValue('gray.200', 'gray.700');
  
  // Se define el color del brillo para los temas.
  const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');

  return (
    <Box id="precios" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
      <VStack spacing={12} maxW="container.lg" mx="auto">
        <Heading as="h2" size="2xl" color={headingColor} textAlign="center">
          Tarifas y Precios
        </Heading>
        <Text fontSize="lg" color={textColor} textAlign="center" maxW="3xl">
          Nuestras tarifas son sencillas y transparentes, pensadas para que disfrutes al máximo tu estadía sin sorpresas.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">

          {/* Caja de Precios */}
          <MotionVStack
            bg={priceBoxBg}
            borderWidth="1px"
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            w="100%"
            spacing={4}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            h="100%"
            // --- MODIFICACIÓN AQUÍ ---
            // 1. El borde y el brillo ahora son el estado por defecto.
            borderColor={glowColor}
            shadow={`0 0 15px ${glowColor}`}
            // 2. El hover solo levanta la tarjeta y aumenta un poco el brillo.
            _hover={{
              transform: 'translateY(-5px)',
              shadow: `0 0 20px ${glowColor}`,
            }}
          >
            <PriceLineItem label="Precio por noche (base 2 personas)" value="₡35,000" />
            <Divider borderColor={dividerColor} />
            <PriceLineItem label="Persona adicional por noche" value="₡7,000" />
            <Divider borderColor={dividerColor} />
            <PriceLineItem label="Somos pet friendly, monto por mascota" value="₡5,000" />
          </MotionVStack>

          {/* Caja de "A tener en cuenta" */}
          <MotionVStack
            bg={priceBoxBg}
            borderWidth="1px"
            p={{base: 6, md: 8}}
            borderRadius="lg"
            align="start"
            spacing={4}
            w="100%"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            h="100%"
            // --- MODIFICACIÓN AQUÍ ---
            // 3. Se replica el efecto en la segunda tarjeta.
            borderColor={glowColor}
            shadow={`0 0 15px ${glowColor}`}
            _hover={{
              transform: 'translateY(-5px)',
              shadow: `0 0 20px ${glowColor}`,
            }}
          >
            <HStack>
              <Icon as={FaInfoCircle} w={6} h={6} color={infoIconColor} />
              <Heading as="h4" size="md" color={headingColor}>A tener en cuenta</Heading>
            </HStack>
            <List spacing={6} pl={4} fontSize="sm" color={textColor}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                La tarifa base es para 2 personas. Se pueden alojar hasta 6 personas en total.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                Política de cancelación: Reembolso completo hasta 15 días antes de la llegada.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                El check-in es a partir de las 3:00 PM y el check-out es hasta las 11:00 AM.
              </ListItem>
            </List>
          </MotionVStack>
        </SimpleGrid>
        
        <Text fontSize="lg" color={textColor} textAlign="center" pt={4}>
          ¿Listo para tu escapada?{' '}
          <ScrollLink
            to="contacto"
            smooth={true}
            duration={500}
            offset={-100}
            style={{
              color: linkColor,
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            Contáctanos
          </ScrollLink>
          {' '}para realizar tu reserva.
        </Text>

      </VStack>
    </Box>
  );
}