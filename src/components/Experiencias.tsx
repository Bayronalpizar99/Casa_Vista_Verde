import {
  Box, Heading, Text, VStack, SimpleGrid, Image, useColorModeValue, Icon,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWineGlassAlt, FaFire, FaEye } from 'react-icons/fa';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { useState } from 'react';

import balconImg from '../assets/balcon.jpg';
import cocinaImg from '../assets/cocina.jpg';
import barImg from '../assets/bar.jpg';
import hogueraImg from '../assets/hoguera.jpg';

const experienceData = [
  {
    image: balconImg,
    icon: MdBalcony,
    title: "Balcón con Vistas",
    description: "Disfruta de tu café matutino o una copa de vino al atardecer con vistas panorámicas que te robarán el aliento."
  },
  {
    image: cocinaImg,
    icon: MdOutlineKitchen,
    title: "Cocina Equipada",
    description: "Prepara tus platillos favoritos. Nuestra cocina cuenta con todo lo necesario para que te sientas como en casa."
  },
  {
    image: hogueraImg,
    icon: FaFire,
    title: "Noches de Hoguera",
    description: "Reúnete alrededor del fuego bajo un cielo estrellado. El lugar perfecto para crear recuerdos inolvidables."
  },
  {
    image: barImg,
    icon: FaWineGlassAlt,
    title: "Mini Bar Privado",
    description: "Relájate y disfruta de una selección de bebidas a tu alcance para complementar tu estadía."
  }
];

const MotionBox = motion(Box);

// --- Componente para una Tarjeta de Experiencia ---
const ExperienceCard = ({ experience, index, onViewImage }: { experience: typeof experienceData[0], index: number, onViewImage: (image: string) => void }) => {
  const cardTextColor = useColorModeValue('white', 'dark.primary');
  
  // --- MODIFICACIÓN AQUÍ ---
  // 1. Definimos los colores para el borde y el botón del ojo
  const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');
  const eyeButtonBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.500');
  const eyeButtonColor = useColorModeValue('light.accent', 'dark.accent');

  return (
    <MotionBox
      position="relative"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      h="400px"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      
      // --- MODIFICACIÓN AQUÍ ---
      // 2. Añadimos el borde y el efecto de brillo al pasar el cursor
      borderWidth="2px"
      borderColor="transparent"
      _hover={{
        borderColor: glowColor,
        boxShadow: `0 0 10px ${glowColor}`,
      }}
    >
      <Image src={experience.image} alt={experience.title} w="100%" h="100%" objectFit="cover" />
      
      <IconButton
        aria-label="Ver imagen"
        icon={<FaEye />}
        position="absolute"
        top={4}
        right={4}
        isRound
        // 3. Usamos los colores dinámicos para el botón
        bg={eyeButtonBg}
        color={eyeButtonColor}
        _hover={{ bg: eyeButtonBg, transform: 'scale(1.1)' }}
        onClick={() => onViewImage(experience.image)}
        zIndex={2}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-t, blackAlpha.800, transparent)"
        display="flex"
        alignItems="flex-end"
        p={6}
      >
        <VStack align="start" spacing={3} color={cardTextColor}>
          <Icon as={experience.icon} w={10} h={10} />
          <Heading as="h3" size="lg">{experience.title}</Heading>
          <Text fontSize="md">{experience.description}</Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};

// --- Componente para el Modal de la Imagen ---
const ImageModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string | null }) => {
  if (!imageUrl) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="transparent" shadow="none">
        <ModalCloseButton color="white" bg="blackAlpha.500" _hover={{ bg: 'blackAlpha.700' }} />
        <ModalBody p={0}>
          <Image src={imageUrl} alt="Vista ampliada de la experiencia" borderRadius="md" w="100%" h="auto" objectFit="contain" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export function Experiencias() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleViewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const bgColor = useColorModeValue('light.background', 'dark.background');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const textColor = useColorModeValue('light.text', 'dark.text');

  return (
    <Box id="experiencias" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
      <VStack spacing={12} maxW="container.xl" mx="auto">
        <Heading as="h2" size="2xl" color={headingColor} textAlign="center">
          Nuestros Espacios
        </Heading>
        <Text fontSize="lg" color={textColor} textAlign="center" maxW="3xl">
          Más que un lugar para dormir, te ofrecemos espacios pensados para que disfrutes, te relajes y vivas una estadía memorable.
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} w="100%">
          {experienceData.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} onViewImage={handleViewImage} />
          ))}
        </SimpleGrid>
      </VStack>

      <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
    </Box>
  );
}