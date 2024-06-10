import { Whatsapp, Message } from "@wppconnect-team/wppconnect";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { StickerTypes, createSticker } from "wa-sticker-formatter";
import ffmpeg from "fluent-ffmpeg";

export async function stickerCreator(client: Whatsapp, message: Message) {
  const tempDir = path.resolve("temp");
  await fs.mkdir(tempDir, { recursive: true });

  try {
    if (message.type === "video") {
      console.log("Media received:", message.type);

      const bufferMedia = await client.decryptFile(message);
      console.log(bufferMedia);

      const videoPath = path.resolve(tempDir, "temp.mp4");
      await fs.writeFile(videoPath, bufferMedia);

      const webpPath = path.resolve(tempDir, "output.webp");

      ffmpeg(videoPath)
        .outputOptions("-vf", "scale= 300:300")
        .toFormat("webp")
        .save(webpPath)
        .on("error", console.error)
        .on("end", async () => {
          console.log("WebP created");
          await client.sendImageAsSticker(message.from, webpPath);
        });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}