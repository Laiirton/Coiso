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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function stickerCreator(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const tempDir = path_1.default.resolve("temp");
        yield promises_1.default.mkdir(tempDir, { recursive: true });
        try {
            if (message.type === "video") {
                console.log("Media received:", message.type);
                const bufferMedia = yield client.decryptFile(message);
                console.log(bufferMedia);
                const videoPath = path_1.default.resolve(tempDir, "temp.mp4");
                yield promises_1.default.writeFile(videoPath, bufferMedia);
                const webpPath = path_1.default.resolve(tempDir, "output.webp");
                (0, fluent_ffmpeg_1.default)(videoPath)
                    .outputOptions("-vf", "scale= 300:300")
                    .toFormat("webp")
                    .save(webpPath)
                    .on("error", console.error)
                    .on("end", () => __awaiter(this, void 0, void 0, function* () {
                    console.log("WebP created");
                    yield client.sendImageAsSticker(message.from, webpPath);
                }));
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
exports.stickerCreator = stickerCreator;
