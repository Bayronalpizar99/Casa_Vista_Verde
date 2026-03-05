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
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import home2 from '../assets/home2.mp4';
import home3 from '../assets/home3.webp';
import home4 from '../assets/home4.webp';
import home5 from '../assets/home5.webp';
import home from '../assets/home.webp';

export function Hero() {
  const { t } = useLanguage();
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer para detectar cuando la sección está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <>
      {/* CSS para las animaciones */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .hero-title {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hero-title.visible {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease-out;
          }
          
          .hero-subtitle {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
          }
          
          .hero-subtitle.visible {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          .hero-button {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
          }
          
          .hero-button.visible {
            opacity: 1;
            transform: scale(1);
            animation: fadeInScale 0.8s ease-out 0.4s both;
          }

          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(8px); opacity: 1; }
          }

          .scroll-indicator {
            animation: scrollBounce 2s ease-in-out infinite;
          }
        `}
      </style>

      <Box 
        ref={heroRef}
        id="inicio" 
        h="100vh" 
        w="full" 
        position="relative" 
        overflow="hidden"
      >
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
          icon={<ChevronLeftIcon w={{ base: 5, md: 8 }} h={{ base: 5, md: 8 }} />}
          onClick={handlePrev}
          position="absolute"
          left={{ base: 4, md: 8 }}
          top={{ base: '42%', md: '50%' }}
          transform="translateY(-50%)"
          zIndex={3}
          bg={navButtonBg}
          color={navButtonColor}
          w={{ base: '40px', md: '48px' }}
          h={{ base: '40px', md: '48px' }}
          minW={{ base: '40px', md: '48px' }}
          minH={{ base: '40px', md: '48px' }}
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            bg: 'whiteAlpha.500',
            transform: 'translateY(-50%) scale(1.1)',
          }}
          transition="all 0.2s"
        />

        <IconButton
          aria-label="Siguiente imagen"
          icon={<ChevronRightIcon w={{ base: 5, md: 8 }} h={{ base: 5, md: 8 }} />}
          onClick={handleNext}
          position="absolute"
          right={{ base: 4, md: 8 }}
          top={{ base: '42%', md: '50%' }}
          transform="translateY(-50%)"
          zIndex={3}
          bg={navButtonBg}
          color={navButtonColor}
          w={{ base: '40px', md: '48px' }}
          h={{ base: '40px', md: '48px' }}
          minW={{ base: '40px', md: '48px' }}
          minH={{ base: '40px', md: '48px' }}
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            bg: 'whiteAlpha.500',
            transform: 'translateY(-50%) scale(1.1)',
          }}
          transition="all 0.2s"
        />

        {/* Overlay with gradient for depth */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-b, blackAlpha.400, blackAlpha.600 50%, blackAlpha.800)"
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
          <VStack spacing={8} textAlign="center" color={heroTextColor} flex="1" justify="center">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '6xl', lg: '7xl' }}
              fontWeight="600"
              letterSpacing={{ base: '0.02em', md: '0.03em' }}
              lineHeight="1.1"
              textShadow="0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)"
              className={`hero-title ${isInView ? 'visible' : ''}`}
            >
              {t('heroTitle')}
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
              maxW="2xl"
              fontWeight="400"
              letterSpacing="0.02em"
              textShadow="0 1px 10px rgba(0,0,0,0.4)"
              className={`hero-subtitle ${isInView ? 'visible' : ''}`}
            >
              {t('heroSubtitle')}
            </Text>
            <Box className={`hero-button ${isInView ? 'visible' : ''}`}>
              <ScrollLink to="contacto" smooth={true} duration={500} offset={-80}>
                <Button
                  size="lg"
                  bg={buttonBg}
                  color={buttonColor}
                  px={10}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="full"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  boxShadow="0 4px 20px rgba(0,0,0,0.3)"
                  _hover={{
                    opacity: 0.9,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
                  }}
                  transition="all 0.3s ease"
                >
                  {t('reservarAhora')}
                </Button>
              </ScrollLink>
            </Box>
          </VStack>

          {/* Scroll-down indicator */}
          <Box
            position="absolute"
            bottom={{ base: '70px', md: '80px' }}
            left="50%"
            transform="translateX(-50%)"
            zIndex={3}
            className="scroll-indicator"
          >
            <Box
              w="28px"
              h="44px"
              borderRadius="full"
              border="2px solid"
              borderColor="whiteAlpha.500"
              display="flex"
              justifyContent="center"
              pt="8px"
            >
              <Box w="3px" h="10px" bg="whiteAlpha.700" borderRadius="full" />
            </Box>
          </Box>

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
    </>
  );
}