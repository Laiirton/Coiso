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
const whatsappClient_1 = require("./utils/whatsappClient");
const messageController_1 = require("./controllers/messageController");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, whatsappClient_1.createWhatsappClient)();
        client === null || client === void 0 ? void 0 : client.onMessage((message) => {
            (0, messageController_1.processMessage)(client, message);
        });
    });
}
main();
