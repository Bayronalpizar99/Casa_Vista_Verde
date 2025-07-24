import { Box, Heading, Text, VStack, HStack, Icon, Flex, useColorModeValue, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTree, FaCheese, FaChurch } from 'react-icons/fa';
import { GiSprout, GiWaterfall } from 'react-icons/gi';

import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../translations'; 

import parqueZarceroImg from '../assets/parque-zarcero.jpg';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface InterestPointProps {
    icon: React.ElementType;
    titleKey: TranslationKey;
    descriptionKey: TranslationKey;
}

const InterestPoint = ({ icon, titleKey, descriptionKey }: InterestPointProps) => {
    const { t } = useLanguage();
    const iconColor = useColorModeValue('light.accent', 'dark.accent');
    const descriptionColor = useColorModeValue('light.text', 'dark.text');

    return (
        <HStack align="start" spacing={4} w="100%">
            <Icon as={icon} w={7} h={7} color={iconColor} mt={1} />
            <VStack align="start">
                <Text fontWeight="bold">{t(titleKey)}</Text>
                <Text fontSize="sm" color={descriptionColor}>{t(descriptionKey)}</Text>
            </VStack>
        </HStack>
    );
};

export function Ubicacion() {
    const { t } = useLanguage();
    const sectionBgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const dividerColor = useColorModeValue('gray.300', 'gray.700');
    const glowColor = useColorModeValue('#0b6f3c', '#90f4c0');
    
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5587.571416599125!2d-84.40909887234169!3d10.217030116896249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa067ece1287a01%3A0xdfcbd943e8a8e675!2sCasa%20Vista%20Verde!5e1!3m2!1ses!2scr!4v1753318031555!5m2!1ses!2scr";

    return (
        <Flex
            id="ubicacion"
            direction={{ base: 'column', lg: 'row' }}
            minH="100vh"
            overflow="hidden"
            bg={sectionBgColor}
        >
            <MotionBox
                flex={{ base: 'none', lg: '1' }}
                w={{ base: '100%', lg: '50%' }}
                h={{ base: '40vh', lg: 'auto' }}
                position="relative"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                
                borderColor={glowColor}
                boxShadow={`0 0 8px ${glowColor}`}
                borderWidth={{ base: "2px", lg: "0" }}
                borderTopWidth={{ lg: "2px" }}
                borderRightWidth={{ lg: "2px" }}
                borderBottomWidth={{ lg: "2px" }}
                
                _hover={{
                    boxShadow: `0 0 10px ${glowColor}`,
                }}
            >
                <Image
                    src={parqueZarceroImg}
                    alt={t('parqueZarceroDesc')}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                />
            </MotionBox>

            <MotionVStack
                flex="1"
                w={{ base: '100%', lg: '50%' }}
                bg={sectionBgColor}
                p={{ base: 8, md: 12, lg: 16 }}
                spacing={8}
                align="start"
                justify="center"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <Heading as="h2" size="2xl" color={headingColor}>
                    {t('ubicacionTitle')}
                </Heading>
                
                <Text fontSize="lg" maxW="xl" color={textColor}>
                    {t('ubicacionSubtitle')}
                </Text>

                <Divider borderColor={dividerColor} />

                <Flex direction={{ base: 'column', md: 'row' }} w="100%" gap={8}>
                    <VStack align="start" spacing={4} flex="1">
                        <Heading as="h3" size="lg" color={headingColor}>
                            {t('encuentranos')}
                        </Heading>
                        <Box w="100%" h="290px" borderRadius="md" shadow="md" overflow="hidden">
                            <iframe
                                src={mapSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location of Casa Vista Verde"
                            ></iframe>
                        </Box>
                        <HStack color={textColor}>
                            <Icon as={FaMapMarkerAlt} w={5} h={5} />
                            <Text>{t('direccionCompleta')}</Text>
                        </HStack>
                    </VStack>

                    <VStack align="start" spacing={4} flex="1" color={textColor} pl={{ md: 6 }}>
                        <Heading as="h3" size="lg" color={headingColor}>
                            {t('tesorosDeZarcero')}
                        </Heading>
                        <VStack spacing={4} w="100%">
                            <InterestPoint icon={GiSprout} titleKey="parqueZarceroTitle" descriptionKey="parqueZarceroDesc" />
                            <InterestPoint icon={FaChurch} titleKey="iglesiaSanRafaelTitle" descriptionKey="iglesiaSanRafaelDesc" />
                            <InterestPoint icon={FaCheese} titleKey="gastronomiaLocalTitle" descriptionKey="gastronomiaLocalDesc" />
                            <InterestPoint icon={GiWaterfall} titleKey="cataratasCercanasTitle" descriptionKey="cataratasCercanasDesc" />
                            <InterestPoint icon={FaTree} titleKey="airePuroTitle" descriptionKey="airePuroDesc" />
                        </VStack>
                    </VStack>
                </Flex>
            </MotionVStack>
        </Flex>
    );
}