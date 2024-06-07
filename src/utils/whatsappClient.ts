import { Whatsapp, create } from '@wppconnect-team/wppconnect';

export async function createWhatsappClient() {
  try {
    const client = await create({
      session: 'Coiso', // Passe o nome da sessão do cliente que você deseja iniciar o bot
      catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log('Número de tentativas para ler o código QR:', attempts);
        console.log('Código QR em formato de texto:', asciiQR);
        console.log('Código QR em formato base64:', base64Qrimg);
        console.log('Código de URL (data-ref):', urlCode);
      },
      statusFind: (statusSession, session) => {
        console.log('Status da sessão:', statusSession); // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        // Crie uma sessão wss retornando "serverClose" no caso do servidor fechar
        console.log('Nome da sessão:', session);
      },
      headless: true, // Chrome sem interface gráfica
      devtools: false, // Não abrir as ferramentas de desenvolvimento
      useChrome: true, // Se false, usará a instância do Chromium
      debug: false, // Não abrir uma sessão de depuração
      logQR: true, // Registrar o código QR automaticamente no terminal
      browserWS: '', // Se você quiser usar o endereço browserWSEndpoint
      browserArgs: [''], // Parâmetros a serem adicionados na instância do navegador Chrome
      puppeteerOptions: {}, // Será passado para puppeteer.launch
      disableWelcome: false, // Opção para desabilitar a mensagem de boas-vindas que aparece no início
      updatesLog: true, // Registra atualizações de informações automaticamente no terminal
      autoClose: 60000, // Fecha automaticamente o wppconnect apenas ao ler o código QR (padrão 60 segundos, se você quiser desativá-lo, atribua 0 ou false)
      tokenStore: 'file', // Define como trabalhar com tokens, que pode ser uma interface personalizada
      folderNameToken: './src/tokens/', // Nome da pasta ao salvar tokens
      // BrowserSessionToken
      // Para receber o token do cliente, use a função await client.getSessionTokenBrowser()
      sessionToken: {
        WABrowserId: '"UnXjH..."',
        WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
        WAToken1: '"0i8..."',
        WAToken2: '"1@lPpzwC..."',
      }
    });
  
    return client;
  } catch (error) {
    console.log('Erro:', error);
  }
}


