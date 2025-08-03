import { Box, Heading, Button, useColorModeValue, VStack, Flex, useDisclosure } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ReservationModal } from './ReservationModal';
import { useLanguage } from '../context/LanguageContext';

export function CallToAction() {
    const { t } = useLanguage();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('light.accent', 'dark.accent');
    const textColor = useColorModeValue('light.primary', 'dark.primary');
    const pulseColor = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(41, 47, 61, 0.5)');

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
                        <Button 
                            size={{ base: "md", md: "lg" }} 
                            variant="solid" 
                            colorScheme="gray" 
                            onClick={onOpen}
                            w={{ base: "280px", md: "auto" }}
                            maxW={{ base: "90%", md: "none" }}
                        >
                            {t('reservarEstadia')}
                        </Button>

                        <Flex position="relative" alignItems="center" justifyContent="center">
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'md',
                                    background: pulseColor,
                                    zIndex: 0,
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 0, 0.7],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            <Button
                                as="a"
                                href="https://wa.me/50683154952"
                                target="_blank"
                                size={{ base: "md", md: "lg" }}
                                variant="outline"
                                leftIcon={<FaWhatsapp />}
                                _hover={{
                                    bg: 'whiteAlpha.300',
                                }}
                                zIndex={1}
                                w={{ base: "280px", md: "auto" }}
                                maxW={{ base: "90%", md: "none" }}
                                fontSize={{ base: "sm", md: "md" }}
                            >
                                {t('contactarWhatsApp')}
                            </Button>
                        </Flex>
                    </Flex>
                </VStack>
            </Box>
            
            <ReservationModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}