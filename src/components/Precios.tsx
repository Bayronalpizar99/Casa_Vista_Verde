import { Box, Heading, Text, VStack, useColorModeValue, List, ListItem, ListIcon, Icon, Divider, HStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../translations';

const MotionVStack = motion(VStack);
const PriceLineItem = ({ labelKey, value }: { labelKey: TranslationKey; value: string }) => {
    const { t } = useLanguage();
    const labelColor = useColorModeValue('light.text', 'dark.text');
    const valueColor = useColorModeValue('light.primary', 'dark.primary');

    return (
        <Flex justify="space-between" w="100%" py={3}>
            <Text color={labelColor}>{t(labelKey)}</Text>
            <Text fontWeight="bold" fontSize="lg" color={valueColor}>{value}</Text>
        </Flex>
    );
};

export function Precios() {
    const { t } = useLanguage(); // Hook para traducciones
    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const priceBoxBg = useColorModeValue('white', 'transparent');
    const infoIconColor = useColorModeValue('light.secondary', 'dark.secondary');
    const checkIconColor = useColorModeValue('light.accent', 'dark.accent');
    const linkColor = useColorModeValue('light.accent', 'dark.accent');
    const dividerColor = useColorModeValue('gray.200', 'gray.700');
    
    const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');

    return (
        <Box id="precios" py={{ base: 16, md: 24 }} px={{ base: 4, md: 10 }} bg={bgColor}>
            <VStack spacing={12} maxW="container.lg" mx="auto">
                <Heading as="h2" size="2xl" color={headingColor} textAlign="center">
                    {t('tarifasYPrecios')}
                </Heading>
                <Text fontSize="lg" color={textColor} textAlign="center" maxW="3xl">
                    {t('preciosSubtitle')}
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">

                    {}
                    <MotionVStack
                        bg={priceBoxBg}
                        borderWidth="1px"
                        p={{ base: 6, md: 8 }}
                        borderRadius="lg"
                        w="100%"
                        spacing={4}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        h="100%"
                        borderColor={glowColor}
                        shadow={`0 0 2px ${glowColor}`}
                        _hover={{
                            transform: 'translateY(-5px)',
                            shadow: `0 0 6px ${glowColor}`,
                        }}
                    >
                        <PriceLineItem labelKey="precioNoche" value="₡35,000" />
                        <Divider borderColor={dividerColor} />
                        <PriceLineItem labelKey="personaAdicional" value="₡7,000" />
                        <Divider borderColor={dividerColor} />
                        <PriceLineItem labelKey="petFriendly" value="₡5,000" />
                    </MotionVStack>

                    {}
                    <MotionVStack
                        bg={priceBoxBg}
                        borderWidth="1px"
                        p={{base: 6, md: 8}}
                        borderRadius="lg"
                        align="start"
                        spacing={4}
                        w="100%"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        h="100%"
                        borderColor={glowColor}
                        shadow={`0 0 2px ${glowColor}`}
                        _hover={{
                            transform: 'translateY(-5px)',
                            shadow: `0 0 6px ${glowColor}`,
                        }}
                    >
                        <HStack>
                            <Icon as={FaInfoCircle} w={6} h={6} color={infoIconColor} />
                            <Heading as="h4" size="md" color={headingColor}>{t('aTenerEnCuenta')}</Heading>
                        </HStack>
                        <List spacing={6} pl={4} fontSize="sm" color={textColor}>
                            <ListItem>
                                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                                {t('tenerEnCuenta1')}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                                {t('tenerEnCuenta2')}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheckCircle} color={checkIconColor} />
                                {t('tenerEnCuenta3')}
                            </ListItem>
                        </List>
                    </MotionVStack>
                </SimpleGrid>
                
                <Text fontSize="lg" color={textColor} textAlign="center" pt={4}>
                    {t('listoParaTuEscapada')}{' '}
                    <ScrollLink
                        to="contacto"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        style={{
                            color: linkColor,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            textDecoration: 'underline'
                        }}
                    >
                        {t('contacto')}
                    </ScrollLink>
                    {' '}{t('contactanosPrompt')}
                </Text>

            </VStack>
        </Box>
    );
}