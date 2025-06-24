import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>

      <Text style={styles.sectionTitle}>Atualizada em: 17/05/2025</Text>
      <Text style={styles.paragraph}>
        Bem-vindo(a) ao aplicativo &quot;Meu Filho é Autista e Agora?&quot;, desenvolvido para oferecer orientações, suporte e recursos às famílias após o diagnóstico de autismo. Este Termo de Privacidade explica como coletamos, usamos e protegemos suas informações, garantindo transparência e segurança em sua jornada. Ao utilizar nosso aplicativo, você concorda com estas práticas. Caso não concorde, recomendamos não prosseguir com o uso.
      </Text>

      <Text style={styles.secondTitle}>Termos e Condições</Text>
      <Text style={styles.sectionTitle}>1. Coleta de dados</Text>
      <Text style={styles.paragraph}>
        Informações Pessoais. Coletamos apenas dados necessários para:Cadastro: Nome, e-mail, idade da criança (opcional).Personalização: Interesses selecionados (ex: direitos, terapias) para envio de conteúdo relevante.Documentos: Fotos ou arquivos enviados por você ficam armazenados apenas no seu dispositivo, a menos que você opte por backup em nuvem.Dados Não Pessoais: Uso do app: Tempo de navegação, funcionalidades mais acessadas (para melhorias técnicas).Localização: Apenas se você ativar o mapa de benefícios locais (nunca compartilhada com terceiros).
      </Text>

      <Text style={styles.sectionTitle}>2. Como usamos seus dados</Text>
      <Text style={styles.paragraph}>
        Para você: Enviar lembretes de documentos e benefícios. Sugerir conteúdos e comunidades baseados em seus interesses. Para melhorar o app: Análise de funcionalidades mais utilizadas. Correção de bugs. Nunca para: Vender dados a terceiros; Divulgar informações identificáveis publicamente.
      </Text>

      <Text style={styles.sectionTitle}>3. Compartilhamento de dados</Text>
      <Text style={styles.paragraph}>
        Seus dados não serão compartilhados, exceto em situações específicas: Com sua autorização: Ex.: Ao conectar-se a um grupo de apoio no fórum. Por exigência legal: Caso requisitado por autoridades competentes.
      </Text>

      <Text style={styles.sectionTitle}>4. Responsabilidade do usuário</Text>
      <Text style={styles.paragraph}>
        Você é responsável por: Manter login e senha em sigilo. Informar dados precisos sobre benefícios e documentos. O app não substitui orientação médica ou jurídica profissional.
      </Text>

      <Text style={styles.sectionTitle}>5. Alterações nesta política</Text>
      <Text style={styles.paragraph}>
        Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos revisar esta página regularmente para estar ciente de quaisquer alterações.
      </Text>

      <Text style={styles.sectionTitle}>6. Encerramento de conta</Text>
      <Text style={styles.paragraph}>
        Você pode deletar sua conta a qualquer momento em Configurações &gt; Privacidade. Seus dados serão excluídos em até 30 dias.
      </Text>

      <Text style={styles.sectionTitle}>7. Contato</Text>
      <Text style={styles.paragraph}>
        Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: suporte@meufilhoautistaeagora.com
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
   secondTitle: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 10,
  },
});
