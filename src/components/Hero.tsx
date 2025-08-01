import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ScrollLink } from 'react-scroll';
import { useLanguage } from '../context/LanguageContext';
import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Importa tus archivos

import home2 from '../assets/home2.mp4';
import home3 from '../assets/home3.webp';
import home4 from '../assets/home4.webp';
import home5 from '../assets/home5.webp';
import home from '../assets/home.webp';



export function Hero() {
  const { t } = useLanguage();
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonBg = useColorModeValue('light.accent', 'dark.accent');
  const buttonColor = useColorModeValue('light.primary', 'dark.primary');
  const heroTextColor = useColorModeValue('white', '#c2c8d6');
  const navButtonBg = useColorModeValue('whiteAlpha.300', 'blackAlpha.400');
  const navButtonColor = useColorModeValue('white', '#c2c8d6');
  const activeDotColor = useColorModeValue('white', '#c2c8d6');
  const inactiveDotColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.400');

  const slides = [
 
    { type: 'video', src: home2 },
    { type: 'image', src: home3 },
    { type: 'image', src: home4 },
    { type: 'image', src: home5 },
    { type: 'image', src: home },
  ];

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <Box id="inicio" h="100vh" w="full" position="relative" overflow="hidden">
      {/* Swiper para las slides */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper: SwiperType) => {
          setActiveIndex(swiper.realIndex);
        }}
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

      {/* Flechas de navegación */}
      <IconButton
        aria-label="Imagen anterior"
        icon={<ChevronLeftIcon w={8} h={8} />}
        onClick={handlePrev}
        position="absolute"
        left={{ base: 4, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={3}
        isRound
        bg={navButtonBg}
        color={navButtonColor}
        size="lg"
        _hover={{
          bg: 'whiteAlpha.500',
          transform: 'translateY(-50%) scale(1.1)',
        }}
        transition="all 0.2s"
      />

      <IconButton
        aria-label="Siguiente imagen"
        icon={<ChevronRightIcon w={8} h={8} />}
        onClick={handleNext}
        position="absolute"
        right={{ base: 4, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={3}
        isRound
        bg={navButtonBg}
        color={navButtonColor}
        size="lg"
        _hover={{
          bg: 'whiteAlpha.500',
          transform: 'translateY(-50%) scale(1.1)',
        }}
        transition="all 0.2s"
      />

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
        direction="column"
      >
        <VStack spacing={6} textAlign="center" color={heroTextColor} flex="1" justify="center">
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

        {/* Indicadores de puntos */}
        <HStack 
          spacing={3} 
          position="absolute" 
          bottom={{ base: 6, md: 8 }} 
          left="50%" 
          transform="translateX(-50%)"
          zIndex={3}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              w={3}
              h={3}
              borderRadius="full"
              bg={activeIndex === index ? activeDotColor : inactiveDotColor}
              cursor="pointer"
              onClick={() => goToSlide(index)}
              transition="all 0.3s ease"
              _hover={{
                bg: activeDotColor,
                transform: 'scale(1.2)',
              }}
            />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}