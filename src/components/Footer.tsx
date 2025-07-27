import { Box, Container, Flex, HStack, IconButton, Image, Link as ChakraLink, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import logoLight from '../assets/CASA.png';
import logoDark from '../assets/CASA2.png';
import { Link as RouterLink } from 'react-router-dom'; 

export function Footer() {
    const { t } = useLanguage(); // Hook para traducciones

    const bgColor = useColorModeValue('light.background', 'dark.background');
    const textColor = useColorModeValue('light.primary', 'dark.text');
    const headingColor = useColorModeValue('light.text', 'dark.primary');
    const borderColor = useColorModeValue('light.secondary', 'dark.secondary');
    const logoSrc = useColorModeValue(logoLight, logoDark);
    const iconBg = useColorModeValue('white', 'gray.700');

    return (
        <Box bg={bgColor} color={textColor}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
                    
                    <VStack spacing={0} align="center" mb={{ base: 8, md: 0 }}>
                        <Image src={logoSrc} h="258px" alt="Logo Casa Vista Verde" />
                        <HStack spacing={5} mt="-70px">
                            <IconButton 
                                as="a" 
                                href="https://www.facebook.com/profile.php?id=100088581027543&mibextid=ZbWKwL"
                                target="_blank"
                                aria-label="Facebook" 
                                icon={<FaFacebook />} 
                                isRound={true}
                                bg={iconBg}
                                boxShadow="md"
                                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                            />
                            <IconButton 
                                as="a" 
                                href="https://instagram.com/vista.verde2023"
                                target="_blank"
                                aria-label="Instagram" 
                                icon={<FaInstagram />} 
                                isRound={true}
                                bg={iconBg}
                                boxShadow="md"
                                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                            />
                            <IconButton 
                                as="a" 
                                href="https://wa.me/50683154952"
                                target="_blank"
                                aria-label="WhatsApp" 
                                icon={<FaWhatsapp />} 
                                isRound={true}
                                bg={iconBg}
                                boxShadow="md"
                                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                            />
                        </HStack>
                    </VStack>
                    
                    <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={{base: 0, md: 24}}>
                        <Text fontWeight="bold" color={headingColor}>{t('contacto')}</Text>
                        <Text>Email: casavistaverde2025@gmail.com</Text>
                        <Text>WhatsApp: (+506) 8315-4952 </Text>
                        <Text>WhatsApp 2: (+506) 8822-1686 </Text>
                    </VStack>

                    <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mt={{base: 8, md: 24}}>
                        <Text fontWeight="bold" color={headingColor}>{t('footerDireccion')}</Text>
                        <Text>{t('footerCalle')}</Text>
                        <Text>{t('footerLugar')}</Text>
                        <Text>{t('footerPais')}</Text>
                    </VStack>

                </Flex>
                
                <Box borderTopWidth={1} borderStyle={'solid'} borderColor={borderColor} mt={8} pt={6}>
                    <Text textAlign="center" fontSize="sm">
                        {t('derechosReservados')} | {}
                        <ChakraLink as={RouterLink} to="/politica-de-privacidad" color={headingColor} _hover={{ textDecoration: 'underline' }}>
                            {t('politicaPrivacidad')}
                        </ChakraLink>
                    </Text>

                    <Text textAlign="center" fontSize="sm" mt={2}>
                        {t('desarrolladoPor')}{' '}
                        <ChakraLink 
                            href="https://github.com/Bayronalpizar99" 
                            isExternal
                            fontWeight="bold"
                            color={headingColor}
                            _hover={{ textDecoration: 'underline' }}
                        >
                            @Bayronalpizar99
                        </ChakraLink>
                    </Text>
                </Box>

            </Container>
        </Box>
    );
}