import {
  Box, Heading, Text, VStack, SimpleGrid, Image, Button, useColorModeValue,
  List, ListItem, ListIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, IconButton, Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBed, FaWifi, FaMountain, FaCoffee, FaCheckCircle, FaTree } from 'react-icons/fa';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import habitacion1Vista1 from '../assets/Habitación 1- Vista 1.jpg';
import habitacion1Vista2 from '../assets/Habitación 1- Vista 2.jpg';
import habitacion2Vista1 from '../assets/Habitación 2- Vista 1.jpg';
import habitacion3Vista1 from '../assets/Habitación 3- Vista 1.jpg';

const MotionBox = motion(Box);

const roomsData = [
    {
    name: "Habitación 1",
    images: [
      habitacion1Vista1,
      habitacion1Vista2,
    ],
    amenities: [
      { icon: FaBed, text: "Cama King Size" },
      { icon: FaMountain, text: "Baño privado" },
      { icon: FaCoffee, text: "Pantalla de televisión" },
    ]
  },
  {
    name: "Habitación 2",
    images: [
      habitacion2Vista1,
    ],
    amenities: [
      { icon: FaBed, text: "Cama Queen Size" },
      { icon: FaTree, text: "Vista al Jardín" },
      { icon: FaWifi, text: "Wi-Fi de alta velocidad" },
    ]
  },
  {
    name: "Habitación 3",
    images: [
      habitacion3Vista1,
    ],
    amenities: [
      { icon: FaBed, text: "Dos camas individuales" },
      { icon: FaMountain, text: "Vistas al jardín" },
      { icon: FaWifi, text: "Wi-Fi de alta velocidad" },
    ]
  },
];

// --- Componente para una Tarjeta de Habitación ---
const RoomCard = ({ room, onOpen, index }: { room: typeof roomsData[0], onOpen: (room: typeof roomsData[0]) => void, index: number }) => {
  const cardBg = useColorModeValue('white', 'transparent');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const iconColor = useColorModeValue('light.accent', 'dark.accent');
  const buttonBg = useColorModeValue('light.primary', 'dark.accent');
  const buttonColor = useColorModeValue('white', 'dark.primary');
  const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Box
        bg={cardBg}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        h="100%"
        // --- MODIFICACIÓN AQUÍ ---
        // 1. El borde y la sombra de brillo ahora son el estado por defecto.
        borderColor={glowColor}
        shadow={`0 0 15px ${glowColor}`}
        
        // 2. Al pasar el cursor, solo se aplica el levantamiento y un leve aumento del brillo.
        _hover={{
          transform: 'translateY(-5px)',
          shadow: `0 0 20px ${glowColor}`,
        }}
      >
        <Image src={room.images[0]} alt={`Foto de ${room.name}`} h="250px" w="100%" objectFit="cover" />
        <VStack p={6} align="start" spacing={4}>
          <Heading as="h3" size="lg" color={headingColor}>{room.name}</Heading>
          <List spacing={2}>
            {room.amenities.map((amenity, idx) => (
              <ListItem key={idx} color={textColor}>
                <ListIcon as={FaCheckCircle} color={iconColor} />
                {amenity.text}
              </ListItem>
            ))}
          </List>
          <Button bg={buttonBg} color={buttonColor} alignSelf="flex-end" onClick={() => onOpen(room)} _hover={{ opacity: 0.9 }}>
            Ver Detalles
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
};

// --- Componente para el Modal de Detalles de la Habitación ---
const RoomDetailModal = ({ isOpen, onClose, room }: { isOpen: boolean, onClose: () => void, room: typeof roomsData[0] | null }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalBg = useColorModeValue('white', '#0b0f0d');
  const headerColor = useColorModeValue('light.primary', 'white');
  const buttonBg = useColorModeValue('light.accent', 'dark.accent');
  const buttonColor = useColorModeValue('light.primary', 'dark.primary');
  const modalBorderColor = useColorModeValue('#0b6f3c', '#90f4c0');

  if (!isOpen && currentImageIndex !== 0) {
    setCurrentImageIndex(0);
  }

  if (!room) return null;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent
        bg={modalBg}
        borderWidth="2px"
        borderColor={modalBorderColor}
        boxShadow={`0 0 10px ${modalBorderColor}`}
      >
        <ModalHeader color={headerColor}>{room.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box position="relative">
            <Image src={room.images[currentImageIndex]} alt={`Foto ${currentImageIndex + 1} de ${room.name}`} borderRadius="md" w="100%" h="500px" objectFit="cover" />
            {room.images.length > 1 && (
              <>
                <IconButton aria-label="Previous Image" icon={<ChevronLeftIcon />} onClick={prevImage} position="absolute" left="10px" top="50%" transform="translateY(-50%)" isRound />
                <IconButton aria-label="Next Image" icon={<ChevronRightIcon />} onClick={nextImage} position="absolute" right="10px" top="50%" transform="translateY(-50%)" isRound />
              </>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button bg={buttonBg} color={buttonColor} _hover={{ opacity: 0.9 }}>
            Reservar Ahora
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


export function Habitaciones() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState<typeof roomsData[0] | null>(null);

  const handleOpenModal = (room: typeof roomsData[0]) => {
    setSelectedRoom(room);
    onOpen();
  };

  const bgColor = useColorModeValue('light.background', 'dark.background');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const textColor = useColorModeValue('light.text', 'dark.text');

  return (
    <Box id="habitaciones" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
      <VStack spacing={12} maxW="container.xl" mx="auto">
        <Heading as="h2" size="2xl" color={headingColor} textAlign="center">
          Nuestras Habitaciones
        </Heading>
        <Text fontSize="lg" color={textColor} textAlign="center" maxW="2xl">
          Cada espacio está diseñado para tu confort y descanso, combinando un estilo elegante con todas las comodidades modernas. Elige el refugio perfecto para tu estadía.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="100%">
          {roomsData.map((room, index) => (
            <RoomCard key={index} room={room} onOpen={handleOpenModal} index={index} />
          ))}
        </SimpleGrid>
      </VStack>
      <RoomDetailModal isOpen={isOpen} onClose={onClose} room={selectedRoom} />
    </Box>
  );
}