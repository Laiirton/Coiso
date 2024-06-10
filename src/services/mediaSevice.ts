import { Whatsapp, Message } from "@wppconnect-team/wppconnect";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export async function stickerCreator(client: Whatsapp, message: Message) {
  const tempDir = path.resolve("temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  try {
    if (message.type === "video") {
      console.log("Media received");
      console.log("Media type:", message.type);

      const base64Media = await client.downloadMedia(message.id);
      const videoBuffer = Buffer.from(base64Media, 'base64');
      const videoPath = path.join(tempDir, `${message.id}.mp4`);
      const gifPath = path.join(tempDir, `${message.id}.gif`);

      fs.writeFileSync(videoPath, videoBuffer);

      ffmpeg(videoPath)
        .outputOptions('-vf', 'scale=320:-1')
        .save(gifPath)
        .on('end', async () => {
          const gifBuffer = fs.readFileSync(gifPath);
          const gifBase64 = gifBuffer.toString('base64');

          await client.sendMessageOptions(message.from, gifBase64,{})
          
          fs.unlinkSync(videoPath); // Remove the temporary video file
          fs.unlinkSync(gifPath); // Remove the temporary GIF file
          console.log('Sticker sent successfully');
        })
        .on('error', (err) => {
          console.error('Error converting video to GIF:', err);
        });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
