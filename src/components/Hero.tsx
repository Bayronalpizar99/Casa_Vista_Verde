import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Importa tus archivos
import home1 from '../assets/home1.mp4';
import home2 from '../assets/home2.mp4';
import home3 from '../assets/home3.webp';
import home5 from '../assets/home5.webp';


export function Hero() {
  const { t } = useLanguage();

  const buttonBg = useColorModeValue('light.accent', 'dark.accent');
  const buttonColor = useColorModeValue('light.primary', 'dark.primary');
  const heroTextColor = useColorModeValue('white', '#c2c8d6');

  const slides = [
    { type: 'video', src: home1 },
    { type: 'video', src: home2 },
    { type: 'image', src: home3 },
    { type: 'image', src: home5 },
   
  ];

  return (
    <Box id="inicio" h="100vh" w="full" position="relative" overflow="hidden">
      {/* Swiper para las slides */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                src={slide.src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <img
                src={slide.src}
                alt={`slide-${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay oscuro */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        zIndex={1}
      />

      {/* Contenido encima */}
      <Flex
        h="100%"
        w="100%"
        align="center"
        justify="center"
        position="relative"
        zIndex={2}
      >
        <VStack spacing={6} textAlign="center" color={heroTextColor}>
          <Heading as="h1" size={{ base: '2xl', md: '4xl' }} fontWeight="bold">
            {t('heroTitle')}
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW="2xl">
            {t('heroSubtitle')}
          </Text>
          <ScrollLink to="contacto" smooth={true} duration={500} offset={-80}>
            <Button
              size="lg"
              bg={buttonBg}
              color={buttonColor}
              px={8}
              _hover={{
                opacity: 0.9,
              }}
            >
              {t('reservarAhora')}
            </Button>
          </ScrollLink>
        </VStack>
      </Flex>
    </Box>
  );
}
