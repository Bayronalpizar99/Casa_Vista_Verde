import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, FormControl, FormLabel, Input, VStack, useColorModeValue, Textarea, NumberInput,
    NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast,
    HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function ReservationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { t } = useLanguage(); 
    const modalBg = useColorModeValue('white', '#0b0f0d');
    const headerColor = useColorModeValue('light.primary', 'white');
    const buttonBg = useColorModeValue('light.accent', 'dark.accent');
    const buttonColor = useColorModeValue('light.primary', 'dark.primary');
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        checkIn: '',
        checkOut: '',
        guests: 2,
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuestsChange = (_: string, valueAsNumber: number) => {
        setFormData(prev => ({ ...prev, guests: valueAsNumber }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const backendUrl = `${import.meta.env.VITE_API_URL}/api/send-email`;

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('La respuesta del servidor no fue OK');
            }
            
            onClose(); 
            toast({
                title: t('toastTitle'),
                description: t('toastDescription'),
                status: 'success',
                duration: 6000,
                isClosable: true,
            });

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            toast({
                title: 'Error al enviar',
                description: 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo o contáctanos por WhatsApp.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent bg={modalBg}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader color={headerColor}>{t('solicitudReserva')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>{t('nombreCompleto')}</FormLabel>
                                <Input name="name" placeholder={t('placeholderNombre')} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{t('email')}</FormLabel>
                                <Input name="email" type="email" placeholder={t('placeholderEmail')} onChange={handleChange} />
                            </FormControl>
                            <HStack w="100%">
                                <FormControl isRequired>
                                    <FormLabel>{t('fechaLlegada')}</FormLabel>
                                    <Input name="checkIn" type="date" onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>{t('fechaSalida')}</FormLabel>
                                    <Input name="checkOut" type="date" onChange={handleChange} min={formData.checkIn || new Date().toISOString().split("T")[0]} />
                                </FormControl>
                            </HStack>
                            <FormControl isRequired>
                                <FormLabel>{t('numHuespedes')}</FormLabel>
                                <NumberInput name="guests" min={1} max={6} defaultValue={2} onChange={handleGuestsChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel>{t('mensajeOpcional')}</FormLabel>
                                <Textarea name="message" placeholder={t('placeholderMensaje')} onChange={handleChange} />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            {t('cancelar')}
                        </Button>
                        <Button
                            type="submit"
                            bg={buttonBg}
                            color={buttonColor}
                            isLoading={isLoading}
                            _hover={{ opacity: 0.9 }}
                        >
                            {t('enviarSolicitud')}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}