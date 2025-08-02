import {
    Box, Heading, Text, VStack, Image, useColorModeValue, Icon,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton, Flex, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaWineGlassAlt, FaFire, FaEye, FaChess } from 'react-icons/fa';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { GiBroccoli } from "react-icons/gi";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import balconImg from '../assets/balcon.jpg';
import cocinaImg from '../assets/cocina.webp';
import barImg from '../assets/bar.webp';
import hogueraImg from '../assets/hoguera.webp';
import fincaImg from '../assets/finca.webp';
import juegosImg from '../assets/juegos.webp';

const MotionBox = motion(Box);

const ExperienceCard = ({ experience, index, onViewImage, containerRef }: { experience: any, index: number, onViewImage: (image: string) => void, containerRef: React.RefObject<HTMLDivElement> }) => {
    const { t } = useLanguage();
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
            h={{ base: "300px", md: "400px" }}
            w="100%"
            borderWidth="2px"
            borderColor="transparent"
            bg="gray.100"
            _hover={{
                borderColor: glowColor,
                boxShadow: `0 0 10px ${glowColor}`,
            }}
        >
            <Image 
                src={experience.image} 
                alt={t(experience.titleKey)} 
                w="100%" 
                h="100%" 
                objectFit="cover"
                objectPosition="center"
                loading="eager"
                onError={(e) => {
                    console.error(`Error loading image: ${experience.image}`, e);
                }}
                onLoad={() => {
                    console.log(`Image loaded successfully: ${experience.image}`);
                }}
            />
            
            <IconButton
                aria-label={t('verImagen')}
                icon={<FaEye />}
                position="absolute"
                top={4}
                right={4}
                isRound
                size={{ base: "sm", md: "md" }}
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
                p={{ base: 4, md: 6 }}
            >
                <VStack align="start" spacing={{ base: 2, md: 3 }} color={cardTextColor}>
                    <Icon as={experience.icon} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} />
                    <Heading as="h3" size={{ base: "md", md: "lg" }}>{t(experience.titleKey)}</Heading>
                    <Text fontSize={{ base: "sm", md: "md" }}>{t(experience.descriptionKey)}</Text>
                </VStack>
            </Box>
        </MotionBox>
    );
};

const ImageModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string | null }) => {
    const { t } = useLanguage();
    if (!imageUrl) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "4xl" }} isCentered>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="transparent" shadow="none" m={{ base: 4, md: 0 }}>
                <ModalCloseButton 
                    color="white" 
                    bg="blackAlpha.500" 
                    _hover={{ bg: 'blackAlpha.700' }}
                    size={{ base: "lg", md: "md" }}
                />
                <ModalBody p={0}>
                    <Image 
                        src={imageUrl} 
                        alt={t('experienciasSubtitle')} 
                        borderRadius="md" 
                        w="100%" 
                        h="auto" 
                        objectFit="contain"
                        maxH={{ base: "90vh", md: "80vh" }}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export function Experiencias() {
    const { t } = useLanguage();
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
            image: fincaImg, 
            icon: GiBroccoli,
            titleKey: "fincaTitle",
            descriptionKey: "fincaDesc"
        },
        {
            image: juegosImg, 
            icon: FaChess,
            titleKey: "juegosTitle",
            descriptionKey: "juegosDesc"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = useBreakpointValue({ base: 1, sm: 2, lg: 3, xl: 4 }) || 1;
    const totalCards = experienceData.length;
    
    // Arreglo del cálculo del maxIndex
    const maxIndex = Math.max(0, totalCards - cardsToShow);
    
    const carouselRef = useRef<HTMLDivElement>(null);

    // Reset del índice cuando cambia el breakpoint
    useEffect(() => {
        setCurrentIndex(0);
    }, [cardsToShow]);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const handleViewImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        onOpen();
    };

    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const buttonBg = useColorModeValue('white', 'gray.800');
    const buttonColor = useColorModeValue('gray.600', 'gray.200');

    // Cálculo del porcentaje de desplazamiento - Fix para múltiples imágenes
    const translatePercentage = (currentIndex * 100);

    console.log('Carousel Debug:', {
        currentIndex,
        cardsToShow,
        maxIndex,
        translatePercentage,
        totalCards
    });

    return (
        <Box id="experiencias" py={{ base: 12, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
            <VStack spacing={{ base: 8, md: 12 }} maxW="container.xl" mx="auto">
                <Heading as="h2" size={{ base: "xl", md: "2xl" }} color={headingColor} textAlign="center">
                    {t('experiencias')}
                </Heading>
                <Text 
                    fontSize={{ base: "md", md: "lg" }} 
                    color={textColor} 
                    textAlign="center" 
                    maxW="3xl"
                    px={{ base: 4, md: 0 }}
                >
                    {t('experienciasSubtitle')}
                </Text>
                
                <Box position="relative" w="100%" maxW="full">
                    {/* Botón Anterior */}
                    <IconButton
                        aria-label={t('anterior')}
                        icon={<ChevronLeftIcon w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} />}
                        onClick={handlePrev}
                        isDisabled={currentIndex === 0}
                        isRound
                        position="absolute"
                        left={{ base: '-10px', sm: '-20px', md: '-50px' }}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={3}
                        bg={buttonBg}
                        color={buttonColor}
                        boxShadow="md"
                        size={{ base: "sm", md: "md" }}
                        _hover={{
                            bg: buttonBg,
                            transform: 'translateY(-50%) scale(1.05)',
                        }}
                        _disabled={{
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        }}
                    />

                    {/* Contenedor del carrusel */}
                    <Box overflow="hidden" ref={carouselRef} w="100%">
                        <Flex
                            transition="transform 0.5s ease-in-out"
                            transform={`translateX(-${translatePercentage}%)`}
                            w={`${totalCards * 100}%`}
                        >
                            {experienceData.map((exp, index) => (
                                <Box 
                                    key={index} 
                                    flex={`0 0 ${100 / totalCards}%`}
                                    p={{ base: 2, sm: 3, lg: 4 }}
                                    w={`${100 / totalCards}%`}
                                >
                                    <ExperienceCard 
                                        experience={exp} 
                                        index={index} 
                                        onViewImage={handleViewImage} 
                                        containerRef={carouselRef} 
                                    />
                                </Box>
                            ))}
                        </Flex>
                    </Box>

                    {/* Botón Siguiente */}
                    <IconButton
                        aria-label={t('siguiente')}
                        icon={<ChevronRightIcon w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} />}
                        onClick={handleNext}
                        isDisabled={currentIndex >= maxIndex}
                        isRound
                        position="absolute"
                        right={{ base: '-10px', sm: '-20px', md: '-50px' }}
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={3}
                        bg={buttonBg}
                        color={buttonColor}
                        boxShadow="md"
                        size={{ base: "sm", md: "md" }}
                        _hover={{
                            bg: buttonBg,
                            transform: 'translateY(-50%) scale(1.05)',
                        }}
                        _disabled={{
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        }}
                    />
                </Box>

                {/* Indicadores de posición mejorados */}
                <Flex justify="center" gap={2} mt={4}>
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <Box
                            key={index}
                            w={3}
                            h={3}
                            borderRadius="full"
                            bg={currentIndex === index ? headingColor : 'gray.300'}
                            cursor="pointer"
                            transition="all 0.2s ease"
                            onClick={() => setCurrentIndex(index)}
                            _hover={{
                                bg: currentIndex === index ? headingColor : 'gray.400',
                                transform: 'scale(1.1)'
                            }}
                        />
                    ))}
                </Flex>
            </VStack>

            <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
        </Box>
    );
}