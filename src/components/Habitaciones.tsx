import {
    Box, Heading, Text, VStack, SimpleGrid, Image, Button, useColorModeValue,
    List, ListItem, ListIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter, IconButton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBed, FaWifi, FaMountain, FaCoffee, FaCheckCircle, FaTree } from 'react-icons/fa';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react'; 
import { useLanguage } from '../context/LanguageContext';
import habitacion1Vista1 from '../assets/Habitación 1- Vista 1.jpeg';
import habitacion1Vista2 from '../assets/Habitación 1- Vista 2.jpg';
import habitacion2Vista1 from '../assets/Habitación 2- Vista 1.jpeg';
import habitacion3Vista1 from '../assets/Habitación 3- Vista 1.jpeg';


const MotionBox = motion(Box);

// --- Componente para una Tarjeta de Habitación ---
const RoomCard = ({ room, onOpen, index }: { room: any, onOpen: (room: any) => void, index: number }) => {
    const { t } = useLanguage(); // Hook para traducciones
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
                borderColor={glowColor}
                shadow={`0 0 2px ${glowColor}`}
                
                _hover={{
                    transform: 'translateY(-5px)',
                    shadow: `0 0 6px ${glowColor}`,
                }}
            >
                <Image src={room.images[0]} alt={t(room.nameKey)} h="250px" w="100%" objectFit="cover" />
                <VStack p={6} align="start" spacing={4}>
                    <Heading as="h3" size="lg" color={headingColor}>{t(room.nameKey)}</Heading>
                    <List spacing={2}>
                        {room.amenities.map((amenity: any, idx: number) => (
                            <ListItem key={idx} color={textColor}>
                                <ListIcon as={FaCheckCircle} color={iconColor} />
                                {t(amenity.textKey)}
                            </ListItem>
                        ))}
                    </List>
                    <Button bg={buttonBg} color={buttonColor} alignSelf="flex-end" onClick={() => onOpen(room)} _hover={{ opacity: 0.9 }}>
                        {t('verDetalles')}
                    </Button>
                </VStack>
            </Box>
        </MotionBox>
    );
};

const RoomDetailModal = ({ isOpen, onClose, room }: { isOpen: boolean, onClose: () => void, room: any | null }) => {
    const { t } = useLanguage(); // Hook para traducciones
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalBg = useColorModeValue('white', '#0b0f0d');
    const headerColor = useColorModeValue('light.primary', 'white');
    const modalBorderColor = useColorModeValue('#0b6f3c', '#90f4c0');

    
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setCurrentImageIndex(0);
            }, 200);
        }
    }, [isOpen]);

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
                boxShadow={`0 0 4px ${modalBorderColor}`}
            >
                <ModalHeader color={headerColor}>{room ? t(room.nameKey) : ''}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box position="relative">
                        <Image src={room.images[currentImageIndex]} alt={`${t('verImagen')} ${currentImageIndex + 1} de ${t(room.nameKey)}`} borderRadius="md" w="100%" h="500px" objectFit="cover" />
                        {room.images.length > 1 && (
                            <>
                                <IconButton aria-label={t('anterior')} icon={<ChevronLeftIcon />} onClick={prevImage} position="absolute" left="10px" top="50%" transform="translateY(-50%)" isRound />
                                <IconButton aria-label={t('siguiente')} icon={<ChevronRightIcon />} onClick={nextImage} position="absolute" right="10px" top="50%" transform="translateY(-50%)" isRound />
                            </>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        {t('cerrar')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


export function Habitaciones() {
    const { t } = useLanguage(); // Hook para traducciones
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
    
    const roomsData = [
        {
            nameKey: "habitacion1Name",
            images: [habitacion1Vista1, habitacion1Vista2],
            amenities: [
                { icon: FaBed, textKey: "habitacion1Amenity1" },
                { icon: FaMountain, textKey: "habitacion1Amenity2" },
                { icon: FaCoffee, textKey: "habitacion1Amenity3" },
            ]
        },
        {
            nameKey: "habitacion2Name",
            images: [habitacion2Vista1],
            amenities: [
                { icon: FaBed, textKey: "habitacion2Amenity1" },
                { icon: FaTree, textKey: "habitacion2Amenity2" },
                { icon: FaWifi, textKey: "habitacion2Amenity3" },
            ]
        },
        {
            nameKey: "habitacion3Name",
            images: [habitacion3Vista1],
            amenities: [
                { icon: FaBed, textKey: "habitacion3Amenity1" },
                { icon: FaMountain, textKey: "habitacion3Amenity2" },
                { icon: FaWifi, textKey: "habitacion3Amenity3" },
            ]
        },
    ];

    const handleOpenModal = (room: any) => {
        setSelectedRoom(room);
        onOpen();
    };

    const handleCloseModal = () => {
        onClose();
    };

    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');

    return (
        <Box id="habitaciones" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
            <VStack spacing={12} maxW="container.xl" mx="auto">
                <Heading as="h2" size="2xl" color={headingColor} textAlign="center">
                    {t('nuestrasHabitaciones')}
                </Heading>
                <Text fontSize="lg" color={textColor} textAlign="center" maxW="2xl">
                    {t('habitacionesSubtitle')}
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="100%">
                    {roomsData.map((room, index) => (
                        <RoomCard key={index} room={room} onOpen={handleOpenModal} index={index} />
                    ))}
                </SimpleGrid>
            </VStack>
            <RoomDetailModal isOpen={isOpen} onClose={handleCloseModal} room={selectedRoom} />
        </Box>
    );
}