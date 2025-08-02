import {
    Box, Heading, Text, VStack, useColorModeValue, Icon,
    HStack, SimpleGrid, Button, Badge, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input,
    Card, CardBody
} from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { FaInfoCircle, FaCalculator, FaStar, FaPaw, FaUsers } from 'react-icons/fa';
import { MdNightlight, MdPersonAdd } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

// --- Componente PriceCard Refactorizado ---
interface PriceCardProps {
    title: string;
    price: string;
    description: string;
    icon: React.ElementType;
    isPopular?: boolean;
    delay: number;
}

const PriceCard = ({ title, price, description, icon, isPopular, delay }: PriceCardProps) => {
    const {} = useLanguage();
    
    // Colores corregidos usando el tema definido
    const cardBg = useColorModeValue('white', 'dark.background'); // Tema dark usa el background principal
    const popularBg = useColorModeValue('light.backgroundE6', 'dark.background'); // Tema dark usa el background principal
    const borderColor = useColorModeValue('gray.200', '#6ba885'); // Tema dark usa un verde más tenue para tarjetas normales
    const popularBorderColor = useColorModeValue('#0b6f3c', 'dark.text'); // Tema dark usa el color de texto (#90f4c0) para la popular
    const textColor = useColorModeValue('light.text', 'dark.text');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const iconColor = useColorModeValue('light.accent', 'dark.accent');

    return (
        <MotionCard
            bg={isPopular ? popularBg : cardBg}
            borderWidth={isPopular ? "2px" : "1px"} // Borde más delgado para tarjetas no populares
            borderColor={isPopular ? popularBorderColor : borderColor}
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            h="100%"
            shadow="md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay }}
            _hover={{
                transform: 'translateY(-8px)',
                boxShadow: 'xl',
            }}
        >
            {isPopular && (
                <Badge
                    position="absolute"
                    top="-1px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={useColorModeValue('light.accent', 'dark.accent')}
                    color="white"
                    px={4}
                    py={1}
                    borderBottomRadius="lg"
                    fontSize="sm"
                    fontWeight="bold"
                >
                    Más Popular
                </Badge>
            )}

            <CardBody textAlign="center" py={8}>
                <VStack spacing={4}>
                    <Icon as={icon} w={16} h={16} color={iconColor} />
                    <Heading size="lg" color={headingColor}>{title}</Heading>
                    <Text fontSize="2xl" color={textColor} fontWeight="bold">
                        {price}
                    </Text>
                    <Text fontSize="md" color={textColor} opacity={0.8}>
                        {description}
                    </Text>
                </VStack>
            </CardBody>
        </MotionCard>
    );
};

// --- Componente PriceCalculator Refactorizado ---
const PriceCalculator = () => {
    const { t } = useLanguage();
    const [nights, setNights] = useState(1);
    const [guests, setGuests] = useState(2);
    const [pets, setPets] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    // Colores corregidos usando el tema definido
    const calculatorBg = useColorModeValue('white', 'dark.background'); // Tema dark usa el background principal
    const inputBg = useColorModeValue('gray.50', 'dark.background'); // Tema dark usa el background principal
    const textColor = useColorModeValue('light.text', 'dark.text');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const resultBg = useColorModeValue('light.secondary', 'dark.secondary');
    const resultColor = useColorModeValue('white', 'white');
    const buttonBg = useColorModeValue('light.accent', 'dark.accent');
    const borderColor = useColorModeValue('gray.200', 'dark.text'); // Tema dark usa el color de texto (#90f4c0)

    useMemo(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                setNights(diffDays);
            }
        }
    }, [checkIn, checkOut]);

    const basePrice = 35000;
    const additionalGuestPrice = 7000;
    const petPrice = 5000;

    const totalPrice = useMemo(() => {
        const additionalGuests = Math.max(0, guests - 2);
        return (basePrice * nights) + (additionalGuestPrice * additionalGuests * nights) + (petPrice * pets * nights);
    }, [nights, guests, pets]);

    const priceInUSD = (totalPrice / 500).toFixed(0); // Aproximación USD

    return (
        <MotionBox
            bg={calculatorBg}
            p={8}
            pb={12} // Padding bottom aumentado para dar más espacio vertical
            borderRadius="2xl"
            border="1px"
            borderColor={borderColor}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            w="100%"
            shadow="lg"
        >
            <VStack spacing={8}> {/* Aumenté el spacing general de 6 a 8 */}
                <HStack>
                    <Icon as={FaCalculator} w={6} h={6} color={headingColor} />
                    <Heading size="lg" color={headingColor}>
                        Calculadora de Precios
                    </Heading>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} w="100%">
                    <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>{t('fechaLlegada')}</Text>
                        <Input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            bg={inputBg}
                            borderColor={borderColor}
                            _focus={{
                                borderColor: useColorModeValue('light.accent', 'dark.text'), // Focus con color de texto en dark
                                boxShadow: `0 0 0 1px ${useColorModeValue('light.accent', 'dark.text')}`
                            }}
                        />
                    </VStack>
                    <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>{t('fechaSalida')}</Text>
                        <Input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split("T")[0]}
                            bg={inputBg}
                            borderColor={borderColor}
                            _focus={{
                                borderColor: useColorModeValue('light.accent', 'dark.text'), // Focus con color de texto en dark
                                boxShadow: `0 0 0 1px ${useColorModeValue('light.accent', 'dark.text')}`
                            }}
                        />
                    </VStack>
                    <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>
                            <Icon as={FaUsers} mr={2} />{t('numHuespedes')}
                        </Text>
                        <NumberInput 
                            value={guests} 
                            onChange={(_, num) => setGuests(num)} 
                            min={1} 
                            max={6}
                        >
                            <NumberInputField 
                                bg={inputBg}
                                borderColor={borderColor}
                                _focus={{
                                    borderColor: useColorModeValue('light.accent', 'dark.text'), // Focus con color de texto en dark
                                    boxShadow: `0 0 0 1px ${useColorModeValue('light.accent', 'dark.text')}`
                                }}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper borderColor={borderColor} color={useColorModeValue('gray.600', 'dark.text')} />
                                <NumberDecrementStepper borderColor={borderColor} color={useColorModeValue('gray.600', 'dark.text')} />
                            </NumberInputStepper>
                        </NumberInput>
                    </VStack>
                    <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>
                            <Icon as={FaPaw} mr={2} />Mascotas
                        </Text>
                        <NumberInput 
                            value={pets} 
                            onChange={(_, num) => setPets(num)} 
                            min={0} 
                            max={3}
                        >
                            <NumberInputField 
                                bg={inputBg}
                                borderColor={borderColor}
                                _focus={{
                                    borderColor: useColorModeValue('light.accent', 'dark.text'), // Focus con color de texto en dark
                                    boxShadow: `0 0 0 1px ${useColorModeValue('light.accent', 'dark.text')}`
                                }}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper borderColor={borderColor} color={useColorModeValue('gray.600', 'dark.text')} />
                                <NumberDecrementStepper borderColor={borderColor} color={useColorModeValue('gray.600', 'dark.text')} />
                            </NumberInputStepper>
                        </NumberInput>
                    </VStack>
                </SimpleGrid>

                <Box bg={resultBg} p={6} borderRadius="xl" w="100%" shadow="md">
                    <VStack spacing={3}>
                        <Heading size="md" color={resultColor}>Total Estimado</Heading>
                        <HStack spacing={6} justify="center" flexWrap="wrap">
                            <VStack>
                                <Text fontSize="sm" color={resultColor} opacity={0.9}>Colones</Text>
                                <Text fontSize="2xl" fontWeight="bold" color={resultColor}>
                                    ₡{totalPrice.toLocaleString()}
                                </Text>
                            </VStack>
                            <VStack>
                                <Text fontSize="sm" color={resultColor} opacity={0.9}>Dólares (aprox.)</Text>
                                <Text fontSize="2xl" fontWeight="bold" color={resultColor}>
                                    ${priceInUSD}
                                </Text>
                            </VStack>
                        </HStack>
                        <Text fontSize="sm" color={resultColor} textAlign="center" opacity={0.9}>
                            {nights} {nights === 1 ? 'noche' : 'noches'} • {guests} {guests === 1 ? 'huésped' : 'huéspedes'}
                            {pets > 0 && ` • ${pets} ${pets === 1 ? 'mascota' : 'mascotas'}`}
                        </Text>
                        <ScrollLink to="contacto" smooth={true} duration={500} offset={-100}>
                            <Button
                                bg={buttonBg}
                                color="white"
                                size="lg"
                                borderRadius="full"
                                leftIcon={<FaStar />}
                                _hover={{ 
                                    opacity: 0.9, 
                                    transform: 'scale(1.02)',
                                    bg: useColorModeValue('light.accent', 'dark.accent')
                                }}
                                shadow="md"
                            >
                                {t('reservarEstadia')}
                            </Button>
                        </ScrollLink>
                    </VStack>
                </Box>

                {/* Sección "A tener en cuenta" dentro de la calculadora - SIN contenedor */}
                <VStack spacing={6}> {/* Aumenté el spacing de 4 a 6 */}
                    <HStack>
                        <Icon as={FaInfoCircle} w={6} h={6} color={headingColor} /> {/* Aumenté el tamaño del icono */}
                        <Heading size="md" color={headingColor}>
                            {t('aTenerEnCuenta')}
                        </Heading>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%"> {/* Aumenté el spacing de 4 a 6 */}
                        <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" color={headingColor} fontSize="sm">
                                Check-in/Check-out
                            </Text>
                            <Text fontSize="sm" color={textColor}> {/* Cambié de xs a sm */}
                                {t('tenerEnCuenta1')}
                            </Text>
                        </VStack>
                        <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" color={headingColor} fontSize="sm">
                                Política de Cancelación
                            </Text>
                            <Text fontSize="sm" color={textColor}> {/* Cambié de xs a sm */}
                                {t('tenerEnCuenta2')}
                            </Text>
                        </VStack>
                        <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" color={headingColor} fontSize="sm">
                                Servicios Incluidos
                            </Text>
                            <Text fontSize="sm" color={textColor}> {/* Cambié de xs a sm */}
                                {t('tenerEnCuenta3')}
                            </Text>
                        </VStack>
                    </SimpleGrid>
                </VStack>
            </VStack>
        </MotionBox>
    );
};

// --- Componente Principal Precios Refactorizado ---
export function Precios() {
    const { t } = useLanguage();
    
    // Colores corregidos usando el tema definido
    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');

    const priceCards = [
        { 
            title: "Tarifa Base", 
            price: '₡35,000 / noche', 
            description: "Hasta dos personas", 
            icon: MdNightlight, 
            isPopular: true, 
            delay: 0.1 
        },
        { 
            title: t('personaAdicional'), 
            price: '₡7,000 / noche', 
            description: "Por cada persona extra", 
            icon: MdPersonAdd, 
            delay: 0.2 
        },
        { 
            title: t('petFriendly'), 
            price: '₡5,000 / estadía', 
            description: "Por cada mascota", 
            icon: FaPaw, 
            delay: 0.3 
        }
    ];

    return (
        <Box 
            id="precios" 
            py={{ base: 16, md: 24 }} 
            px={{ base: 4, md: 10 }} 
            bg={bgColor} 
            minH="100vh"
        >
            <VStack spacing={16} maxW="container.xl" mx="auto">
                <VStack spacing={6} textAlign="center">
                    <Heading as="h2" size="2xl" color={headingColor}>
                        {t('tarifasYPrecios')}
                    </Heading>
                    <Text fontSize="xl" color={textColor} maxW="3xl">
                        {t('preciosSubtitle')}
                    </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
                    {priceCards.map((card, index) => (
                        <PriceCard key={index} {...card} />
                    ))}
                </SimpleGrid>

                <PriceCalculator />
            </VStack>
        </Box>
    );
}