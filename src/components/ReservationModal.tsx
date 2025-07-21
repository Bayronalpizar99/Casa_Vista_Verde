import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, VStack, useColorModeValue, Textarea, NumberInput,
  NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast,
  HStack
} from '@chakra-ui/react';
import { useState } from 'react';

export function ReservationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de envío a un backend
    console.log("Datos de la solicitud:", formData);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      toast({
        title: 'Solicitud Enviada.',
        description: "Gracias por tu interés. Nos pondremos en contacto contigo pronto para confirmar la disponibilidad.",
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      {/* --- CAMBIO AQUÍ: Se eliminaron las propiedades del borde --- */}
      <ModalContent 
        bg={modalBg}
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader color={headerColor}>Solicitud de Reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre Completo</FormLabel>
                <Input name="name" placeholder="Tu nombre" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input name="email" type="email" placeholder="tu@email.com" onChange={handleChange} />
              </FormControl>
              <HStack w="100%">
                <FormControl isRequired>
                  <FormLabel>Fecha de Llegada</FormLabel>
                  <Input name="checkIn" type="date" onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Fecha de Salida</FormLabel>
                  <Input name="checkOut" type="date" onChange={handleChange} />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Número de Huéspedes</FormLabel>
                <NumberInput name="guests" min={1} max={6} defaultValue={2} onChange={handleGuestsChange}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Mensaje (Opcional)</FormLabel>
                <Textarea name="message" placeholder="¿Alguna petición especial?" onChange={handleChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              bg={buttonBg}
              color={buttonColor}
              isLoading={isLoading}
              _hover={{ opacity: 0.9 }}
            >
              Enviar Solicitud
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
