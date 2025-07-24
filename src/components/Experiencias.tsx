import {
    Box, Heading, Text, VStack, Image, useColorModeValue, Icon,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton, Flex, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWineGlassAlt, FaFire, FaEye, FaChess } from 'react-icons/fa';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { GiBroccoli } from "react-icons/gi";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import balconImg from '../assets/balcon.jpg';
import cocinaImg from '../assets/cocina.jpg';
import barImg from '../assets/bar.jpg';
import hogueraImg from '../assets/hoguera.jpg';

const MotionBox = motion(Box);

const ExperienceCard = ({ experience, index, onViewImage, containerRef }: { experience: any, index: number, onViewImage: (image: string) => void, containerRef: React.RefObject<HTMLDivElement> }) => {
    const { t } = useLanguage(); // Hook para traducciones
    const cardTextColor = useColorModeValue('white', 'dark.primary');
    const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');
    const eyeButtonBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.500');
    const eyeButtonColor = useColorModeValue('light.accent', 'dark.accent');

    return (
        <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ root: containerRef, once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            position="relative"
            borderRadius="lg"
            overflow="hidden"
            shadow="lg"
            h="400px"
            w="100%"
            borderWidth="2px"
            borderColor="transparent"
            _hover={{
                borderColor: glowColor,
                boxShadow: `0 0 10px ${glowColor}`,
            }}
        >
            <Image src={experience.image} alt={t(experience.titleKey)} w="100%" h="100%" objectFit="cover" />
            
            <IconButton
                aria-label={t('verImagen')}
                icon={<FaEye />}
                position="absolute"
                top={4}
                right={4}
                isRound
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
                    <Heading as="h3" size="lg">{t(experience.titleKey)}</Heading>
                    <Text fontSize="md">{t(experience.descriptionKey)}</Text>
                </VStack>
            </Box>
        </MotionBox>
    );
};

const ImageModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string | null }) => {
    const { t } = useLanguage(); // Hook para traducciones
    if (!imageUrl) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="transparent" shadow="none">
                <ModalCloseButton color="white" bg="blackAlpha.500" _hover={{ bg: 'blackAlpha.700' }} />
                <ModalBody p={0}>
                    <Image src={imageUrl} alt={t('experienciasSubtitle')} borderRadius="md" w="100%" h="auto" objectFit="contain" />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export function Experiencias() {
    const { t } = useLanguage(); // Hook para traducciones
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    const experienceData = [
        {
            image: balconImg,
            icon: MdBalcony,
            titleKey: "balconTitle",
            descriptionKey: "balconDesc"
        },
        {
            image: cocinaImg,
            icon: MdOutlineKitchen,
            titleKey: "cocinaTitle",
            descriptionKey: "cocinaDesc"
        },
        {
            image: hogueraImg,
            icon: FaFire,
            titleKey: "hogueraTitle",
            descriptionKey: "hogueraDesc"
        },
        {
            image: barImg,
            icon: FaWineGlassAlt,
            titleKey: "barTitle",
            descriptionKey: "barDesc"
        },
        {
            image: 'https://images.unsplash.com/photo-1598122002334-857e35824c80?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            icon: GiBroccoli,
            titleKey: "fincaTitle",
            descriptionKey: "fincaDesc"
        },
        {
            image: 'https://images.unsplash.com/photo-1601925348821-651213349e5d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            icon: FaChess,
            titleKey: "juegosTitle",
            descriptionKey: "juegosDesc"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = useBreakpointValue({ base: 1, sm: 2, lg: 4 }) || 4;
    const totalCards = experienceData.length;
    const maxIndex = totalCards > cardsToShow ? totalCards - cardsToShow : 0;
    
    const carouselRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
    };

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
                    {t('experiencias')}
                </Heading>
                <Text fontSize="lg" color={textColor} textAlign="center" maxW="3xl">
                    {t('experienciasSubtitle')}
                </Text>
                
                <Box position="relative" w="100%">
                    <IconButton
                        aria-label={t('anterior')}
                        icon={<ChevronLeftIcon w={8} h={8} />}
                        onClick={handlePrev}
                        isDisabled={currentIndex === 0}
                        isRound
                        position="absolute"
                        left={{ base: '-20px', md: '-50px' }}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow="md"
                    />
                    <Box overflow="hidden" ref={carouselRef}>
                        <Flex
                            transition="transform 0.5s ease-in-out"
                            transform={`translateX(-${currentIndex * (100 / cardsToShow)}%)`}
                            w={`${(totalCards / cardsToShow) * 100}%`}
                        >
                            {experienceData.map((exp, index) => (
                                <Box key={index} p={{ base: 2, sm: 3, lg: 4 }} w={`${100 / totalCards}%`}>
                                    <ExperienceCard experience={exp} index={index} onViewImage={handleViewImage} containerRef={carouselRef} />
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                    <IconButton
                        aria-label={t('siguiente')}
                        icon={<ChevronRightIcon w={8} h={8} />}
                        onClick={handleNext}
                        isDisabled={currentIndex >= maxIndex}
                        isRound
                        position="absolute"
                        right={{ base: '-20px', md: '-50px' }}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={2}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow="md"
                    />
                </Box>
            </VStack>

            <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
        </Box>
    );
}