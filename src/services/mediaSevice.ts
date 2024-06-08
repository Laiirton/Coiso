import { Whatsapp, Message } from "@wppconnect-team/wppconnect";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export async function stickerCreator(client: Whatsapp, message: Message) {
  if (message.type === "video") {
    console.log("Media received");
    console.log("Media type:", message.type);

    const media = await client.downloadMedia(message.id);
    console.log("Media downloaded");

    // Salva o vídeo em um arquivo temporário
    const videoBuffer = Buffer.from(media.split(",")[1], "base64");
    const tempVideoPath = path.join("./", "temp_video.mp4");
    fs.writeFileSync(tempVideoPath, videoBuffer);

    // Caminho do arquivo temporário para a saida do Webp
    const tempWebpPath = path.join("./", "temp_webp.webp");

    // Converter o vídeo para WebP usando ffmpeg
    await new Promise<void>((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .output(tempWebpPath)
        .videoFilters("scale=512:512")
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
    const webpBuffer = fs.readFileSync(tempWebpPath);
    const webpBase64 = webpBuffer.toString("base64");

    await client
      .sendImageAsStickerGif(
        message.from,
        `data:image/webp;base64,${webpBase64}`
      )
      .then(() => {
        console.log("Sticker sent to", message.from);
      })
      .catch((err) => {
        console.error("Error sending sticker:", err);
      });

    fs.unlinkSync(tempVideoPath);
    fs.unlinkSync(tempWebpPath);
  }
}
