import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useLanguage } from '../context/LanguageContext';

export function PoliticaPrivacidad() {
  const { t } = useLanguage();
  const bgColor = useColorModeValue('light.background', 'dark.background');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const headingColor = useColorModeValue('light.primary', 'dark.primary');
  const HTMLContent = ({ contentKey }: { contentKey: any }) => (
    <Text
      color={textColor}
      fontSize="md"
      dangerouslySetInnerHTML={{ __html: t(contentKey) }}
    />
  );

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={6} align="flex-start">
          <Heading as="h1" size="xl" color={headingColor}>
            {t('privacyTitle')}
          </Heading>

          <HTMLContent contentKey="privacyIntro" />

          <Heading as="h2" size="md" color={headingColor}>
            {t('privacyDataTitle')}
          </Heading>
          <HTMLContent contentKey="privacyDataText" />

          <Heading as="h2" size="md" color={headingColor}>
            {t('privacyUsageTitle')}
          </Heading>
          <HTMLContent contentKey="privacyUsageText" />

          <Heading as="h2" size="md" color={headingColor}>
            {t('privacySecurityTitle')}
          </Heading>
          <HTMLContent contentKey="privacySecurityText" />

          <Heading as="h2" size="md" color={headingColor}>
            {t('privacyRightsTitle')}
          </Heading>
          <HTMLContent contentKey="privacyRightsText" />

          <Heading as="h2" size="md" color={headingColor}>
            {t('privacyContactTitle')}
          </Heading>
          <HTMLContent contentKey="privacyContactText" />

        </VStack>
      </Container>
    </Box>
  );
}