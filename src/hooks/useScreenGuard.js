import * as LocalAuthentication from 'expo-local-authentication';

export function useScreenGuard() {
  const authenticate = async () => {
    try {
      const isEnrolled = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
      
      if (!isEnrolled) {
        alert('Autenticação biométrica não configurada no dispositivo.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Por favor, autentique-se para continuar',
        fallbackLabel: 'Usar senha',
      });

      if (result.success) {
       return true
      } else {
        alert('Autenticação falhou. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar autenticar:', error);
    }
  };

  return authenticate;
}
