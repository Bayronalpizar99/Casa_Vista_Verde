import {
    Box, Heading, Text, VStack, Image, useColorModeValue, Icon,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton, Flex, useBreakpointValue
} from '@chakra-ui/react';
import { FaWineGlassAlt, FaFire, FaEye, FaChess } from 'react-icons/fa';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { GiBroccoli } from "react-icons/gi";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import balconImg from '../assets/balcon.jpg';
import cocinaImg from '../assets/cocina.webp';
import barImg from '../assets/bar.webp';
import hogueraImg from '../assets/hoguera.webp';
import fincaImg from '../assets/finca.webp';
import juegosImg from '../assets/juegos.webp';

const ExperienceCard = ({ experience, onViewImage, isActive }: { 
    experience: any, 
    onViewImage: (image: string) => void,
    isActive?: boolean 
}) => {
    const { t } = useLanguage();
    const cardTextColor = useColorModeValue('white', 'dark.primary');
    const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');
    const eyeButtonBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.500');
    const eyeButtonColor = useColorModeValue('light.accent', 'dark.accent');

    return (
        <Box
            position="relative"
            borderRadius="lg"
            overflow="hidden"
            shadow="lg"
            h={{ base: "350px", md: "400px" }}
            w="100%"
            borderWidth="2px"
            borderColor="transparent"
            bg="gray.100"
            _hover={{
                borderColor: glowColor,
                boxShadow: `0 0 15px ${glowColor}`,
            }}
            opacity={isActive === false ? 0.7 : 1}
            transform={isActive === false ? 'scale(0.95)' : 'scale(1)'}
            transitionDuration="0.3s"
        >
            <Image 
                src={experience.image} 
                alt={t(experience.titleKey)} 
                w="100%" 
                h="100%" 
                objectFit="cover"
                objectPosition="center"
                loading="eager"
                decoding="sync"
                onLoad={() => console.log(`✅ Imagen cargada: ${experience.titleKey}`)}
                onError={(e) => {
                    console.error(`❌ Error cargando: ${experience.titleKey}`, e);
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
                _hover={{ 
                    bg: eyeButtonBg, 
                    transform: 'scale(1.1)' 
                }}
                onClick={() => onViewImage(experience.image)}
                zIndex={2}
            />

            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bgGradient="linear(to-t, blackAlpha.900, blackAlpha.300, transparent)"
                display="flex"
                alignItems="flex-end"
                p={{ base: 4, md: 6 }}
            >
                <VStack align="start" spacing={{ base: 2, md: 3 }} color={cardTextColor}>
                    <Icon as={experience.icon} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} />
                    <Heading as="h3" size={{ base: "md", md: "lg" }} lineHeight="shorter">
                        {t(experience.titleKey)}
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} lineHeight="short">
                        {t(experience.descriptionKey)}
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
};

const ImageModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string | null }) => {
    const { t } = useLanguage();
    if (!imageUrl) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "4xl" }} isCentered>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="transparent" shadow="none" m={{ base: 2, md: 0 }}>
                <ModalCloseButton 
                    color="white" 
                    bg="blackAlpha.600" 
                    _hover={{ bg: 'blackAlpha.800' }}
                    size="lg"
                    top={4}
                    right={4}
                />
                <ModalBody p={0}>
                    <Image 
                        src={imageUrl} 
                        alt={t('experienciasSubtitle')} 
                        borderRadius="md" 
                        w="100%" 
                        h="auto" 
                        objectFit="contain"
                        maxH="90vh"
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
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(experienceData.length).fill(false));
    const isMobile = useBreakpointValue({ base: true, md: false });
    const cardsToShow = useBreakpointValue({ base: 1, sm: 2, lg: 3, xl: 4 }) || 1;
    const totalCards = experienceData.length;

    // Precargar todas las imágenes
    useEffect(() => {
        const preloadImages = async () => {
            const loadPromises = experienceData.map((exp, idx) => {
                return new Promise<void>((resolve) => {
                    const img = new window.Image();
                    img.onload = () => {
                        console.log(`🖼️ Precargada: ${exp.titleKey}`);
                        setImagesLoaded(prev => {
                            const newState = [...prev];
                            newState[idx] = true;
                            return newState;
                        });
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`❌ Error precargando: ${exp.titleKey}`);
                        resolve();
                    };
                    img.src = exp.image;
                });
            });

            await Promise.all(loadPromises);
            console.log('✅ Todas las imágenes precargadas');
        };

        preloadImages();
    }, []);

    const handlePrev = () => {
        console.log(`⬅️ Prev: ${currentIndex} -> ${currentIndex === 0 ? totalCards - 1 : currentIndex - 1}`);
        setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
    };

    const handleNext = () => {
        console.log(`➡️ Next: ${currentIndex} -> ${currentIndex === totalCards - 1 ? 0 : currentIndex + 1}`);
        setCurrentIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
    };

    const handleViewImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        onOpen();
    };

    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const buttonBg = useColorModeValue('white', 'gray.700');
    const buttonColor = useColorModeValue('gray.600', 'gray.200');

    console.log('🔄 Render - Current Index:', currentIndex, 'Images Loaded:', imagesLoaded);

    return (
        <Box id="experiencias" py={{ base: 12, md: 24 }} px={{ base: 4, md: 8 }} bg={bgColor}>
            <VStack spacing={{ base: 8, md: 12 }} maxW="container.xl" mx="auto">
                <Heading as="h2" size={{ base: "xl", md: "2xl" }} color={headingColor} textAlign="center">
                    {t('experiencias')}
                </Heading>
                <Text 
                    fontSize={{ base: "md", md: "lg" }} 
                    color={textColor} 
                    textAlign="center" 
                    maxW="3xl"
                    px={{ base: 2, md: 0 }}
                >
                    {t('experienciasSubtitle')}
                </Text>
                
                {/* Carrusel Mobile - Stack Simple */}
                {isMobile ? (
                    <Box position="relative" w="100%" maxW="400px">
                        {/* Stack de tarjetas - Solo muestra la actual */}
                        <Box position="relative" h="350px">
                            {experienceData.map((exp, index) => (
                                <Box
                                    key={index}
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    w="100%"
                                    h="100%"
                                    opacity={currentIndex === index ? 1 : 0}
                                    transform={currentIndex === index ? 'translateX(0)' : 
                                              currentIndex > index ? 'translateX(-100%)' : 'translateX(100%)'}
                                    transitionDuration="0.4s"
                                    transitionTimingFunction="ease-in-out"
                                    zIndex={currentIndex === index ? 2 : 1}
                                >
                                    <ExperienceCard 
                                        experience={exp} 
                                        onViewImage={handleViewImage}
                                        isActive={currentIndex === index}
                                    />
                                </Box>
                            ))}
                        </Box>

                        {/* Botones de navegación */}
                        <IconButton
                            aria-label={t('anterior')}
                            icon={<ChevronLeftIcon w={6} h={6} />}
                            onClick={handlePrev}
                            position="absolute"
                            left="-20px"
                            top="50%"
                            transform="translateY(-50%)"
                            isRound
                            bg={buttonBg}
                            color={buttonColor}
                            boxShadow="lg"
                            size="md"
                            _hover={{ bg: buttonBg, transform: 'translateY(-50%) scale(1.1)' }}
                            zIndex={3}
                        />
                        
                        <IconButton
                            aria-label={t('siguiente')}
                            icon={<ChevronRightIcon w={6} h={6} />}
                            onClick={handleNext}
                            position="absolute"
                            right="-20px"
                            top="50%"
                            transform="translateY(-50%)"
                            isRound
                            bg={buttonBg}
                            color={buttonColor}
                            boxShadow="lg"
                            size="md"
                            _hover={{ bg: buttonBg, transform: 'translateY(-50%) scale(1.1)' }}
                            zIndex={3}
                        />

                        {/* Indicadores */}
                        <Flex justify="center" gap={2} mt={6}>
                            {experienceData.map((_, index) => (
                                <Box
                                    key={index}
                                    w={currentIndex === index ? 8 : 3}
                                    h={3}
                                    borderRadius="full"
                                    bg={currentIndex === index ? headingColor : 'gray.300'}
                                    cursor="pointer"
                                    transitionDuration="0.3s"
                                    onClick={() => {
                                        console.log(`🎯 Click indicador: ${index}`);
                                        setCurrentIndex(index);
                                    }}
                                    _hover={{
                                        bg: currentIndex === index ? headingColor : 'gray.400',
                                    }}
                                />
                            ))}
                        </Flex>

                        {/* Debug info */}
                        <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                            {currentIndex + 1} / {totalCards} - {experienceData[currentIndex].titleKey}
                        </Text>
                    </Box>
                ) : (
                    /* Carrusel Desktop */
                    <Box position="relative" w="100%">
                        <IconButton
                            aria-label={t('anterior')}
                            icon={<ChevronLeftIcon w={8} h={8} />}
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            isDisabled={currentIndex === 0}
                            position="absolute"
                            left="-60px"
                            top="50%"
                            transform="translateY(-50%)"
                            isRound
                            bg={buttonBg}
                            color={buttonColor}
                            boxShadow="md"
                            zIndex={2}
                        />

                        <Box overflow="hidden">
                            <Flex
                                transitionDuration="0.5s"
                                transitionTimingFunction="ease-in-out"
                                transform={`translateX(-${currentIndex * (100 / cardsToShow)}%)`}
                            >
                                {experienceData.map((exp, index) => (
                                    <Box key={index} flex={`0 0 ${100 / cardsToShow}%`} px={4}>
                                        <ExperienceCard 
                                            experience={exp} 
                                            onViewImage={handleViewImage} 
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        <IconButton
                            aria-label={t('siguiente')}
                            icon={<ChevronRightIcon w={8} h={8} />}
                            onClick={() => setCurrentIndex(prev => Math.min(totalCards - cardsToShow, prev + 1))}
                            isDisabled={currentIndex >= totalCards - cardsToShow}
                            position="absolute"
                            right="-60px"
                            top="50%"
                            transform="translateY(-50%)"
                            isRound
                            bg={buttonBg}
                            color={buttonColor}
                            boxShadow="md"
                            zIndex={2}
                        />
                    </Box>
                )}
            </VStack>

            <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
        </Box>
    );
}