import {
    Box, Heading, Text, VStack, HStack, Avatar, Icon, useColorModeValue
} from '@chakra-ui/react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { StarIcon } from '@chakra-ui/icons';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useRef } from 'react';

// --- Datos de las Reseñas (sin cambios) ---
interface Review {
    id: number; name: string; avatar: string; rating: number; date: string; comment: string;
}
const reviews: Review[] = [
    { id: 1, name: "María González", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2024-01-15", comment: "Una experiencia absolutamente increíble. El lugar es mágico, rodeado de naturaleza exuberante. Las habitaciones son cómodas y el servicio excepcional." },
    { id: 2, name: "Cecilia", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2024-01-12", comment: "Fue espectacular. Un lugar hermoso donde se respira tranquilidad, paz y armonía con la naturaleza. La fogata que hicimos en la noche sin palabras. Quedamos encantados con el lugar, la casa y las atenciones que nos brindaron" },
    { id: 3, name: "Ana Martín", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", rating: 4, date: "2024-01-10", comment: "El lugar estaba hermoso, bastante amplio. Tenía un gran jardín para que nuestras mascotas pudieran jugar. La casa completamente equipada y acondicionada para pasarla increíble. Frío riquísimo, fogata lista para ser utilizada y todo muy limpio." },
    { id: 4, name: "Diego López", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2024-01-08", comment: "La atencion excelente. Las vistas y la comodidad inmejorables. Muchas gracias. 100% recomendado y planeamos volver" },
    { id: 5, name: "Laura Jiménez", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2024-01-05", comment: "El lugar está muy completo, la casa tiene muchas áreas y opciones para disfrutarla. Está muy completo todo lo que ofrece." },
    { id: 6, name: "Roberto Castillo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 4, date: "2024-01-02", comment: "Airbnb bien equipado. La cocina tenía la mayoría de las cosas para cocinar hornear. Las camas son cómodas, la vista es maravillosa y las verduras frescas del jardín eran una verdadera delicia, así como la fruta que nos proporcionaron. 5 adultos teníamos mucho espacio en un clima lluvioso." },
    { id: 7, name: "Carmen Vega", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2023-12-28", comment: "Un paraíso escondido. La atención al detalle es impresionante y cada rincón está pensado para brindar comodidad y belleza." },
    { id: 8, name: "Fernando Ruiz", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2023-12-25", comment: "La casa está súper bien equipada. Juan Gabriel y Patricia son excelentes, amables y atentos. Es un lugar de paz, linda vista y frescura. Gracias por todo." },
    { id: 9, name: "Patricia Morales", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", rating: 4, date: "2023-12-22", comment: "Increíble ubicación y servicios de alta calidad. Las habitaciones son espaciosas y elegantes. Ideal para una escapada romántica." },
    { id: 10, name: "Alejandro Herrera", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2023-12-20", comment: "Excelente vista, casa muy tranquila, lo considero un sitio para descansar y estar en paz." },
    { id: 11, name: "Sofía Mendoza", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face", rating: 5, date: "2023-12-18", comment: "Es un hospedaje perfecto, los anfitriones te hacen sentir como en casa, muy atentos y dispuestos a ayudarnos en todo y con recomendaciones del lugar, todo muy limpio y aseado, se agradecen las frutas de cortesía, perfecto para pasar en familia." },
    { id: 12, name: "Javier Sandoval", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", rating: 4, date: "2023-12-15", comment: "Un lugar que realmente te conecta con la esencia de Costa Rica. La biodiversidad del área es fascinante y las instalaciones son impecables." }
];


const ReviewCard = ({ review }: { review: Review }) => {
    const cardBg = useColorModeValue('white', 'transparent');
    const borderColor = useColorModeValue('gray.200', 'dark.text');
    const hoverBorderColor = useColorModeValue('light.text', 'dark.text');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const nameColor = useColorModeValue('light.primary', 'dark.primary');
    const dateColor = useColorModeValue('light.secondary', 'dark.secondary');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const renderStars = (rating: number) => {
        const filledStarColor = useColorModeValue('light.accent', 'dark.accent');
        const emptyStarColor = useColorModeValue('gray.300', 'gray.600');
        
        return Array.from({ length: 5 }, (_, i) => 
            <Icon 
                key={i} 
                as={StarIcon} 
                color={i < rating ? filledStarColor : emptyStarColor} 
                boxSize={3}
            />
        );
    };

    return (
        <Box 
            bg={cardBg} 
            p={4} 
            borderRadius="lg" 
            border="2px" 
            borderColor={borderColor} 
            shadow="sm" 
            minW="400px" 
            maxW="400px" 
            h="220px"
            display="flex" 
            flexDirection="column" 
            mx={2}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            _hover={{
                borderColor: hoverBorderColor
            }}
            transition="border-color 0.2s ease"
        >
            <HStack spacing={3} mb={3}>
                <Avatar src={review.avatar} name={review.name} size="sm"/>
                <Box flex="1">
                    <HStack justify="space-between" align="start">
                        <Box>
                            <Text fontWeight="semibold" fontSize="sm" color={nameColor} noOfLines={1}>
                                {review.name}
                            </Text>
                            <HStack spacing={1}>{renderStars(review.rating)}</HStack>
                        </Box>
                        <Text fontSize="xs" color={dateColor} flexShrink={0}>
                            {formatDate(review.date)}
                        </Text>
                    </HStack>
                </Box>
            </HStack>
            <Text 
                color={textColor} 
                fontSize="sm" 
                lineHeight="1.4" 
                flex="1" 
                noOfLines={5}
            >
                {review.comment}
            </Text>
        </Box>
    );
};

// --- Componente de Carrusel Mejorado ---
const InfiniteCarousel = ({ reviews, direction = 'left' }: { reviews: Review[]; direction?: 'left' | 'right' }) => {
    const CARD_WIDTH = 416; // 400px de ancho + 16px de margen (mx={2} * 2)
    const DURATION = reviews.length * 8; // Duración total de una vuelta
    const totalWidth = CARD_WIDTH * reviews.length;
    
    // El punto de partida del carrusel, duplicado para un bucle suave
    const x = useMotionValue(direction === 'left' ? 0 : -totalWidth);
    const animationControls = useRef<any>(null);

    // Función que inicia el bucle infinito
    const runAnimation = () => {
        const from = direction === 'left' ? 0 : -totalWidth;
        const to = direction === 'left' ? -totalWidth : 0;

        animationControls.current = animate(x, [from, to], {
            duration: DURATION,
            ease: 'linear',
            onComplete: () => {
                x.set(from); // Vuelve al inicio sin animación
                runAnimation(); // Reinicia el bucle
            },
        });
    };

    // Función para reanudar la animación desde donde se detuvo
    const resumeAnimation = () => {
        const currentX = x.get();
        const endPoint = direction === 'left' ? -totalWidth : 0;
        
        // Calcula la distancia y la duración restantes
        const remainingDistance = Math.abs(endPoint - currentX);
        const progress = remainingDistance / totalWidth;
        const remainingDuration = DURATION * progress;

        animationControls.current = animate(x, [currentX, endPoint], {
            duration: remainingDuration,
            ease: 'linear',
            onComplete: () => {
                x.set(direction === 'left' ? 0 : -totalWidth);
                runAnimation();
            },
        });
    };
    
    useEffect(() => {
        runAnimation();
        // Detiene la animación cuando el componente se desmonta
        return () => animationControls.current?.stop();
    }, []);

    return (
        <Box 
            overflow="hidden" 
            w="full"
            position="relative"
            onMouseEnter={() => animationControls.current?.stop()}
            onMouseLeave={() => resumeAnimation()}
        >
            {/* Gradientes de desvanecimiento en los bordes - SOLO EN DESKTOP */}
            <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                width="120px"
                bgGradient={useColorModeValue(
                    "linear(to-r, light.background 0%, rgba(240,244,242,0.8) 50%, transparent 100%)",
                    "linear(to-r, dark.background 0%, rgba(11,15,13,0.8) 50%, transparent 100%)"
                )}
                zIndex={2}
                pointerEvents="none"
                // Ocultar en móvil
                display={{ base: 'none', md: 'block' }}
            />
            <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                width="120px"
                bgGradient={useColorModeValue(
                    "linear(to-l, light.background 0%, rgba(240,244,242,0.8) 50%, transparent 100%)",
                    "linear(to-l, dark.background 0%, rgba(11,15,13,0.8) 50%, transparent 100%)"
                )}
                zIndex={2}
                pointerEvents="none"
                // Ocultar en móvil
                display={{ base: 'none', md: 'block' }}
            />
            
            <motion.div style={{ display: 'flex', x }}>
                {[...reviews, ...reviews].map((review, index) => (
                    <motion.div
                        key={`${review.id}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: index * 0.05,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <ReviewCard review={review} />
                    </motion.div>
                ))}
            </motion.div>
        </Box>
    );
};

// --- Componente Principal Resenas ---
export function Resenas() {
    const { } = useLanguage();
    const bgColor = useColorModeValue('light.background', 'dark.background');
    const headingColor = useColorModeValue('light.primary', 'dark.primary');
    const textColor = useColorModeValue('light.text', 'dark.text');

    const containerVariants = { 
        hidden: { opacity: 0, y: 30 }, 
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            } 
        } 
    };
    
    const firstRow = reviews.slice(0, 6);
    const secondRow = reviews.slice(6, 12);

    return (
        <Box id="resenas" py={{ base: 16, md: 24 }} bg={bgColor} overflowX="hidden">
            <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.1, margin: "-100px 0px -100px 0px" }}
            >
                <VStack spacing={12} maxW="full" mx="auto">
                    <VStack spacing={6} textAlign="center" px={{ base: 4, md: 10 }}>
                        <Heading as="h2" size="2xl" color={headingColor}>
                            Lo que dicen nuestros huéspedes
                        </Heading>
                        <Text fontSize="xl" color={textColor} maxW="3xl">
                            Experiencias auténticas de quienes han visitado nuestra casa.
                        </Text>
                    </VStack>
                    <VStack spacing={8} w="full">
                        <InfiniteCarousel reviews={firstRow} direction="left" />
                        <InfiniteCarousel reviews={secondRow} direction="right" />
                    </VStack>
                </VStack>
            </motion.div>
        </Box>
    );
}