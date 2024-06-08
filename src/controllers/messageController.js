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
exports.processMessage = void 0;
const mediaSevice_1 = require("../services/mediaSevice");
function processMessage(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield client.getContact(message.from);
        const senderName = (contact === null || contact === void 0 ? void 0 : contact.pushname) || message.from;
        console.log(message);
        // Acessa a propriedade caption da mensagem
        const caption = message.caption;
        // Verifica se o caption é igual a "!fig"
        if (caption === "!fig") {
            yield (0, mediaSevice_1.sendSticker)(client, message);
        }
    });
}
exports.processMessage = processMessage;
