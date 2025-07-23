import { Box, Heading, Text, VStack, HStack, Icon, Flex, useColorModeValue, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTree, FaCheese, FaChurch } from 'react-icons/fa';
import { GiSprout, GiWaterfall } from 'react-icons/gi';
import parqueZarceroImg from '../assets/parque-zarcero.jpg';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const InterestPoint = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const iconColor = useColorModeValue('light.accent', 'dark.accent');
  const descriptionColor = useColorModeValue('light.text', 'dark.text');

  return (
    <HStack align="start" spacing={4} w="100%">
      <Icon as={icon} w={7} h={7} color={iconColor} mt={1} />
      <VStack align="start">
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm" color={descriptionColor}>{description}</Text>
      </VStack>
    </HStack>
  );
};

export function Ubicacion() {
  const sectionBgColor = useColorModeValue('light.background', 'dark.background');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const dividerColor = useColorModeValue('gray.300', 'gray.700');
  const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');

  // --- CORRECCIÓN FINAL DEL MAPA ---
  // Se utiliza la URL proporcionada por el usuario.
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.40863823927725!2d-84.4071865!3d10.218105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa067ece1287a01%3A0xdfcbd943e8a8e675!2sCasa%20Vista%20Verde!5e0!3m2!1ses!2scr!4v1752643631990!5m2!1ses!2scr";

  return (
    <Flex
      id="ubicacion"
      direction={{ base: 'column', lg: 'row' }}
      minH="100vh"
      overflow="hidden"
      bg={sectionBgColor}
    >
      <MotionBox
        flex={{ base: 'none', lg: '1' }}
        w={{ base: '100%', lg: '50%' }}
        h={{ base: '40vh', lg: 'auto' }}
        position="relative"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        
        borderColor={glowColor}
        boxShadow={`0 0 8px ${glowColor}`}
        borderWidth={{ base: "2px", lg: "0" }}
        borderTopWidth={{ lg: "2px" }}
        borderRightWidth={{ lg: "2px" }}
        borderBottomWidth={{ lg: "2px" }}
        
        _hover={{
          boxShadow: `0 0 10px ${glowColor}`,
        }}
      >
        <Image
          src={parqueZarceroImg}
          alt="Parque de Zarcero con sus famosas esculturas de ciprés."
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </MotionBox>

      <MotionVStack
        flex="1"
        w={{ base: '100%', lg: '50%' }}
        bg={sectionBgColor}
        p={{ base: 8, md: 12, lg: 16 }}
        spacing={8}
        align="start"
        justify="center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <Heading as="h2" size="2xl" color={headingColor}>
          Un Refugio en las Alturas de Tapezco
        </Heading>
        
        <Text fontSize="lg" maxW="xl" color={textColor}>
          Estamos ubicados en las tranquilas montañas de Tapezco a tan solo 5 minutos de Zarcero, un lugar famoso por su aire fresco, sus paisajes verdes y su cultura auténtica.
        </Text>

        <Divider borderColor={dividerColor} />

        <Flex direction={{ base: 'column', md: 'row' }} w="100%" gap={8}>
          <VStack align="start" spacing={4} flex="1">
            <Heading as="h3" size="lg" color={headingColor}>
              Encuéntranos
            </Heading>
            <Box w="100%" h="290px" borderRadius="md" shadow="md" overflow="hidden">
              <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
            <HStack color={textColor}>
              <Icon as={FaMapMarkerAlt} w={5} h={5} />
              <Text>Tapezco, Zarcero, Alajuela, Costa Rica</Text>
            </HStack>
          </VStack>

          <VStack align="start" spacing={4} flex="1" color={textColor} pl={{ md: 6 }}>
            <Heading as="h3" size="lg" color={headingColor}>
              Tesoros de Zarcero
            </Heading>
            <VStack spacing={4} w="100%">
              <InterestPoint icon={GiSprout} title="Parque de Zarcero" description="Admira el famoso jardín de esculturas en ciprés." />
              <InterestPoint icon={FaChurch} title="Iglesia de San Rafael" description="Una joya arquitectónica con hermosos acabados." />
              <InterestPoint icon={FaCheese} title="Gastronomía Local" description="Prueba la natilla, quesos frescos y bizcochos." />
              <InterestPoint icon={GiWaterfall} title="Cataratas Cercanas" description="Descubre caídas de agua y pozas de aguas celestes." />
              <InterestPoint icon={FaTree} title="Aire Puro y Montaña" description="Respira, camina y disfruta de la paz de las alturas." />
            </VStack>
          </VStack>
        </Flex>
      </MotionVStack>
    </Flex>
  );
}