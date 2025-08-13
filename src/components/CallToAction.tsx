import { Box, Heading, useColorModeValue, VStack, Flex, useDisclosure, IconButton, Tooltip } from '@chakra-ui/react';
import { FaWhatsapp, FaAirbnb, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ReservationModal } from './ReservationModal';
import { useLanguage } from '../context/LanguageContext';

export function CallToAction() {
    const { t } = useLanguage();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('light.accent', 'dark.accent');
    const textColor = useColorModeValue('light.primary', 'dark.primary');
    const pulseColor = useColorModeValue('rgba(37, 211, 102, 0.4)', 'rgba(37, 211, 102, 0.6)');

    return (
        <>
            <Box id="contacto" bg={bgColor} color={textColor} py={{ base: 12, md: 20 }}>
                <VStack spacing={{ base: 6, md: 8 }} textAlign="center" px={{ base: 4, md: 0 }}>
                    <Heading 
                        as="h2" 
                        size={{ base: "xl", md: "2xl" }} 
                        px={4}
                        lineHeight={{ base: "shorter", md: "base" }}
                    >
                        {t('ctaTitle')}
                    </Heading>
                    
                    {/* Stack vertical en móvil, horizontal en desktop */}
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, md: 6 }}
                        alignItems="center"
                        justifyContent="center"
                        w={{ base: "100%", md: "auto" }}
                    >
                        {/* Botón de Reserva, WhatsApp y Airbnb - Todos circulares */}
                        <Flex
                            direction={{ base: "column", sm: "row" }}
                            gap={{ base: 6, sm: 10, md: 12 }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {/* Botón Reservar - Circular */}
                            <Flex position="relative" alignItems="center" justifyContent="center">
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: useColorModeValue('rgba(113, 128, 150, 0.4)', 'rgba(160, 174, 192, 0.4)'),
                                        zIndex: 0,
                                    }}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 0, 0.8],
                                    }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 0.8,
                                    }}
                                />
                                <Tooltip 
                                    label="Reserva tu estadía ahora" 
                                    fontSize="sm"
                                    closeOnClick={true}
                                    closeDelay={100}
                                    openDelay={300}
                                >
                                    <IconButton
                                        onClick={onOpen}
                                        icon={<FaCalendarCheck size="40px" />}
                                        aria-label={t('reservarEstadia')}
                                        size="lg"
                                        isRound
                                        bg={useColorModeValue('gray.600', 'gray.500')}
                                        color="white"
                                        _hover={{
                                            bg: useColorModeValue('gray.700', 'gray.400'),
                                            transform: 'scale(1.1)',
                                        }}
                                        _active={{
                                            bg: useColorModeValue('gray.800', 'gray.600'),
                                        }}
                                        w="70px"
                                        h="70px"
                                        fontSize="40px"
                                        zIndex={1}
                                        transition="all 0.3s ease"
                                        boxShadow={useColorModeValue(
                                            '0 4px 12px rgba(113, 128, 150, 0.4)', 
                                            '0 4px 12px rgba(160, 174, 192, 0.4)'
                                        )}
                                    />
                                </Tooltip>
                            </Flex>

                            {/* Logo WhatsApp */}
                            <Flex position="relative" alignItems="center" justifyContent="center">
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: pulseColor,
                                        zIndex: 0,
                                    }}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 0, 0.8],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                                <Tooltip 
                                    label="Contactar por WhatsApp" 
                                    fontSize="sm"
                                    closeOnClick={true}
                                    closeDelay={100}
                                    openDelay={300}
                                >
                                    <IconButton
                                        as="a"
                                        href="https://wa.me/50683154952"
                                        target="_blank"
                                        icon={<FaWhatsapp size="40px" />}
                                        aria-label="Contactar por WhatsApp"
                                        size="lg"
                                        isRound
                                        bg="#25D366"
                                        color="white"
                                        _hover={{
                                            bg: '#1DA851',
                                            transform: 'scale(1.1)',
                                        }}
                                        _active={{
                                            bg: '#128C7E',
                                        }}
                                        w="70px"
                                        h="70px"
                                        fontSize="40px"
                                        zIndex={1}
                                        transition="all 0.3s ease"
                                        boxShadow="0 4px 12px rgba(37, 211, 102, 0.4)"
                                    />
                                </Tooltip>
                            </Flex>

                            {/* Logo Airbnb */}
                            <Flex position="relative" alignItems="center" justifyContent="center">
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 90, 95, 0.4)',
                                        zIndex: 0,
                                    }}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 0, 0.8],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 1.5,
                                    }}
                                />
                                <Tooltip 
                                    label="Ver disponibilidad en Airbnb" 
                                    fontSize="sm"
                                    closeOnClick={true}
                                    closeDelay={100}
                                    openDelay={300}
                                >
                                    <IconButton
                                        as="a"
                                        href="https://es-l.airbnb.com/rooms/953841041327004084?guests=1&adults=1&s=39&unique_share_id=dfdceaa7-67ad-484b-9122-518c5ab7eaa3" // Cambia esta URL por la de tu propiedad
                                        target="_blank"
                                        icon={<FaAirbnb size="40px" />}
                                        aria-label="Ver en Airbnb"
                                        size="lg"
                                        isRound
                                        bg="#FF5A5F"
                                        color="white"
                                        _hover={{
                                            bg: '#E04348',
                                            transform: 'scale(1.1)',
                                        }}
                                        _active={{
                                            bg: '#C13136',
                                        }}
                                        w="70px"
                                        h="70px"
                                        fontSize="40px"
                                        zIndex={1}
                                        transition="all 0.3s ease"
                                        boxShadow="0 4px 12px rgba(255, 90, 95, 0.4)"
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Flex>
                </VStack>
            </Box>
            
            <ReservationModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}