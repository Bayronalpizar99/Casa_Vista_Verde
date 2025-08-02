import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import logoLight from '../assets/CASA.png';
import logoDark from '../assets/CASA2.png';
import { scroller } from 'react-scroll';
import { useLocation, useNavigate, Link } from 'react-router-dom';

type NavLinkType = {
  key: keyof typeof translations.es;
  href: string;
};

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { lang, toggleLang, t } = useLanguage();

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLinkType[] = [
    { key: 'inicio', href: 'inicio' },
    { key: 'habitaciones', href: 'habitaciones' },
    { key: 'experiencias', href: 'experiencias' },
    { key: 'ubicacion', href: 'ubicacion' },
    { key: 'precios', href: 'precios' },
    { key: 'contacto', href: 'contacto' },
  ];

  const navBgColor = useColorModeValue('light.background', 'dark.background');
  const navTextColor = useColorModeValue('light.text', 'dark.text');
  const secondaryColor = useColorModeValue('light.secondary', 'dark.secondary');
  const hamburgerBgColor = useColorModeValue('light.secondary', 'dark.secondary');
  const borderColor = useColorModeValue('light.text', 'dark.text');
  const accentColor = useColorModeValue('light.accent', 'dark.accent');
  const logoSrc = useColorModeValue(logoLight, logoDark);

  const Separator = () => <Text>/</Text>;

  const handleScroll = (section: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -100,
        });
      }, 200);
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    }

    if (isOpen) onClose();
  };

  const links = navLinks.map((link) => (
    <Text
      key={link.key}
      onClick={() => handleScroll(link.href)}
      px="2"
      textAlign="center"
      fontWeight="medium"
      textTransform="uppercase"
      position="relative"
      whiteSpace="nowrap"
      cursor="pointer"
      _hover={{
        textDecoration: 'none',
        color: secondaryColor,
        _after: {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left',
        },
      }}
      _after={{
        content: '""',
        position: 'absolute',
        width: '100%',
        transform: 'scaleX(0)',
        height: '2px',
        bottom: '-2px',
        left: 0,
        backgroundColor: accentColor,
        transformOrigin: 'bottom right',
        transition: 'transform .25s ease-out',
      }}
    >
      {t(link.key)}
    </Text>
  ));

  return (
    <Box
      bg={navBgColor}
      color={navTextColor}
      px={{ base: 4, md: 8 }}
      pt={4}
      pb={1}
      shadow="md"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo with simple zoom hover effect */}
        <Link to="/" onClick={isOpen ? onClose : undefined}>
          <Image
            src={logoSrc}
            alt="Logo de Casa Vista Verde"
            h="200px"
            mt="-1px"
            transition="transform 0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              cursor: 'pointer',
            }}
          />
        </Link>

        <HStack
          spacing={10}
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          sx={{ transform: 'translateY(-6px)' }}
        >
          <HStack as="nav" divider={<Separator />} minWidth="900px" justifyContent="space-between">
            {links}
          </HStack>

          <Box border="1px solid" borderColor={borderColor} borderRadius="md" p={1}>
            <HStack width="80px" justifyContent="center" spacing={2}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                color={navTextColor}
                _hover={{ bg: 'blackAlpha.200' }}
              />
              <Button
                onClick={toggleLang}
                variant="ghost"
                size="sm"
                textTransform="uppercase"
                color={navTextColor}
                _hover={{ bg: 'blackAlpha.200' }}
              >
                {lang}
              </Button>
            </HStack>
          </Box>
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          bg={hamburgerBgColor}
          color="white"
          _hover={{ opacity: 0.8 }}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4} align="center">
            {links}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}