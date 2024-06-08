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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stickerCreator = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.default.path);
function stickerCreator(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.type === "video") {
            console.log("Video received");
            console.log("Media received");
            console.log("Media type:", message.type);
            const media = yield client.downloadMedia(message.id);
            console.log("Media downloaded");
            yield client
                .sendImageAsSticker(message.from, media)
                .then(() => {
                console.log("Sticker sent to", message.from);
            })
                .catch((err) => {
                console.error("Error sending sticker:", err);
            });
        }
        if (message.isMedia && message.type === "video") {
            console.log("Media received");
            console.log("Media type:", message.type);
            const media = yield client.downloadMedia(message.id);
            console.log("Media downloaded");
            // Salva o vídeo em um arquivo temporário
            const videoBuffer = Buffer.from(media.split(",")[1], "base64");
            const tempVideoPath = path_1.default.join("./", "temp_video.mp4");
            fs_1.default.writeFileSync(tempVideoPath, videoBuffer);
            // Caminho do arquivo temporário para a saida do Webp
            const tempWebpPath = path_1.default.join("./", "temp_webp.webp");
            // Converter o vídeo para WebP usando ffmpeg
            yield new Promise((resolve, reject) => {
                (0, fluent_ffmpeg_1.default)(tempVideoPath)
                    .output(tempWebpPath)
                    .on("end", () => {
                    console.log("Video converted to WebP");
                    resolve();
                })
                    .on("error", (err) => {
                    console.error("Error converting video to WebP:", err);
                    reject();
                })
                    .run();
            });
            // ler o arquivo WebP convertido
            const webpBuffer = fs_1.default.readFileSync(tempWebpPath);
            const webpBase64 = webpBuffer.toString("base64");
            yield client
                .sendImageAsStickerGif(message.from, `data:image/webp;base64,${webpBase64}`)
                .then(() => {
                console.log("Sticker sent to", message.from);
            })
                .catch((err) => {
                console.error("Error sending sticker:", err);
            });
            fs_1.default.unlinkSync(tempVideoPath);
            fs_1.default.unlinkSync(tempWebpPath);
        }
    });
}
exports.stickerCreator = stickerCreator;
