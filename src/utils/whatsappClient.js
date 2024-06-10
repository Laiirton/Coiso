"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWhatsappClient = void 0;
const wppconnect_1 = require("@wppconnect-team/wppconnect");
function createWhatsappClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, wppconnect_1.create)({
                session: "Coiso",
                catchQR: (asciiQR, attempts) => {
                    console.log("Número de tentativas para ler o código QR:", attempts);
                    console.log("Código QR em formato de texto:", asciiQR);
                },
                statusFind: (statusSession, session) => {
                    console.log("Status da sessão:", statusSession); // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
                    // Crie uma sessão wss retornando "serverClose" no caso do servidor fechar
                    console.log("Nome da sessão:", session);
                },
                headless: true,
                devtools: false,
                useChrome: true,
                debug: false,
                logQR: true,
                browserWS: "",
                browserArgs: [""],
                puppeteerOptions: {},
                disableWelcome: false,
                updatesLog: true,
                autoClose: 60000,
                tokenStore: "file",
                folderNameToken: "./tokens/",
                // BrowserSessionToken
                // Para receber o token do cliente, use a função await client.getSessionTokenBrowser()
                sessionToken: {
                    WABrowserId: '"UnXjH..."',
                    WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
                    WAToken1: '"0i8..."',
                    WAToken2: '"1@lPpzwC..."',
                },
            });
            return client;
        }
        catch (error) {
            console.log("Erro:", error);
        }
    });
}
exports.createWhatsappClient = createWhatsappClient;
