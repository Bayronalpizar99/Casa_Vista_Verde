import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

export function PoliticaPrivacidad() {
  const bgColor = useColorModeValue('light.background', 'dark.background');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={6} align="flex-start">
          <Heading as="h1" size="xl" color={headingColor}>
            Política de Privacidad
          </Heading>

          <Text color={textColor} fontSize="md">
            En <strong>Casa Vista Verde</strong> nos comprometemos a proteger la privacidad de nuestros clientes. 
            Los datos personales que recopilamos a través del formulario de reservación son tratados con estricta 
            confidencialidad y conforme a la Ley de Protección de la Persona frente al Tratamiento de sus Datos 
            Personales (Ley N.° 8968, Costa Rica).
          </Text>

          <Heading as="h2" size="md" color={headingColor}>
            1. Datos que recopilamos
          </Heading>
          <Text color={textColor} fontSize="md">
            - Nombre completo <br />
            - Correo electrónico <br />
            - Fechas de la estadía
          </Text>

          <Heading as="h2" size="md" color={headingColor}>
            2. Uso de la información
          </Heading>
          <Text color={textColor} fontSize="md">
            Utilizamos estos datos únicamente para: <br />
            - Gestionar y confirmar la reservación. <br />
            - Comunicarnos con usted para coordinar detalles de su estadía. <br />
            No utilizamos esta información para fines publicitarios sin su consentimiento expreso.
          </Text>

          <Heading as="h2" size="md" color={headingColor}>
            3. Conservación y seguridad
          </Heading>
          <Text color={textColor} fontSize="md">
            Sus datos se almacenan de forma segura y solo se conservarán durante el tiempo necesario para gestionar 
            la reservación. Una vez concluida su estadía, eliminaremos sus datos, salvo que la ley exija conservarlos 
            por más tiempo.
          </Text>

          <Heading as="h2" size="md" color={headingColor}>
            4. Derechos del titular de los datos
          </Heading>
          <Text color={textColor} fontSize="md">
            Usted puede solicitar el acceso, corrección o eliminación de sus datos personales en cualquier momento 
            escribiéndonos a <strong>casavistaverde2025@gmail.com</strong>.
          </Text>

          <Heading as="h2" size="md" color={headingColor}>
            5. Contacto
          </Heading>
          <Text color={textColor} fontSize="md">
            Para cualquier consulta relacionada con esta Política de Privacidad, puede escribirnos a 
            <strong> casavistaverde2025@gmail.com</strong> o llamarnos al <strong>(+506) 8315-4952</strong>.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
