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
        const tempDir = path_1.default.resolve("temp");
        if (!fs_1.default.existsSync(tempDir)) {
            fs_1.default.mkdirSync(tempDir);
        }
        try {
            if (message.type === "video") {
                console.log("Media received");
                console.log("Media type:", message.type);
                const base64Media = yield client.downloadMedia(message.id);
                const videoBuffer = Buffer.from(base64Media, 'base64');
                const videoPath = path_1.default.join(tempDir, `${message.id}.mp4`);
                const gifPath = path_1.default.join(tempDir, `${message.id}.gif`);
                fs_1.default.writeFileSync(videoPath, videoBuffer);
                (0, fluent_ffmpeg_1.default)(videoPath)
                    .outputOptions('-vf', 'scale=320:-1')
                    .save(gifPath)
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const gifBuffer = fs_1.default.readFileSync(gifPath);
                    const gifBase64 = gifBuffer.toString('base64');
                    yield client.sendImageAsStickerGif(message.from, gifBase64);
                    fs_1.default.unlinkSync(videoPath); // Remove the temporary video file
                    fs_1.default.unlinkSync(gifPath); // Remove the temporary GIF file
                    console.log('Sticker sent successfully');
                }))
                    .on('error', (err) => {
                    console.error('Error converting video to GIF:', err);
                });
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
exports.stickerCreator = stickerCreator;
