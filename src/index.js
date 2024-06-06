"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wppconnect_1 = require("@wppconnect-team/wppconnect");
function start(client) {
    // Your start function implementation goes here
}
(0, wppconnect_1.create)({
    session: 'sessionName',
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
    },
    statusFind: (statusSession, session) => {
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
    },
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserWS: '',
    browserArgs: [''],
    puppeteerOptions: {},
    disableWelcome: false,
    updatesLog: true,
    autoClose: 60000,
    tokenStore: 'file',
    folderNameToken: './src/tokens/',
    // BrowserSessionToken
    // To receive the client's token use the function await clinet.getSessionTokenBrowser()
    sessionToken: {
        WABrowserId: '"UnXjH....."',
        WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
        WAToken1: '"0i8...."',
        WAToken2: '"1@lPpzwC...."',
    }
})
    .then((client) => start(client))
    .catch((error) => console.log(error));
