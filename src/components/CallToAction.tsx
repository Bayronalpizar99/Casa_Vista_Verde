import { Box, Heading, Button, HStack, useColorModeValue, VStack, Flex, useDisclosure } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ReservationModal } from './ReservationModal';
import { useLanguage } from '../context/LanguageContext';

export function CallToAction() {
    const { t } = useLanguage(); // Hook para traducciones
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('light.accent', 'dark.accent');
    const textColor = useColorModeValue('light.primary', 'dark.primary');
    const pulseColor = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(41, 47, 61, 0.5)');

    return (
        <>
            <Box id="contacto" bg={bgColor} color={textColor} py={20}>
                <VStack spacing={8} textAlign="center">
                    <Heading as="h2" size="2xl" px={4}>
                        {t('ctaTitle')}
                    </Heading>
                    <HStack spacing={6}>
                        <Button size="lg" variant="solid" colorScheme="gray" onClick={onOpen}>
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
                                size="lg"
                                variant="outline"
                                leftIcon={<FaWhatsapp />}
                                _hover={{
                                    bg: 'whiteAlpha.300',
                                }}
                                zIndex={1}
                            >
                                {t('contactarWhatsApp')}
                            </Button>
                        </Flex>
                    </HStack>
                </VStack>
            </Box>
            
            {}
            <ReservationModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}