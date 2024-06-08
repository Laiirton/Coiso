import { Whatsapp, Message } from "@wppconnect-team/wppconnect";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export async function stickerCreator(client: Whatsapp, message: Message) {
  if (message.isMedia && message.type === 'image') {
    console.log("Media received");
    console.log("Media type:", message.type);

    const media = await client.downloadMedia(message.id).then(async (media) => { 
      console.log('Media downloaded')
      return media;
    });

    await client.sendImageAsSticker(message.from, media).then(() => { 
      console.log('Sticker sent to', message.from);
    });

  }

  if (message.isMedia && message.type === 'video') {
    console.log("Media received");
    console.log("Media type:", message.type);

    const media = await client.downloadMedia(message.id).then(async (media) => { 
      console.log('Media downloaded')
      return media;
    });

    // Salva o vídeo em um arquivo temporário

    const videoBuffer = Buffer.from(media.split(",")[1], "base64");
    const tempVideoPath = path.join('./', 'temp_video.mp4');
    fs.writeFileSync(tempVideoPath, videoBuffer);

    // Caminho do arquivo temporário para a saida do Webp
    const tempWebpPath = path.join('./', 'temp_webp.webp');

    // Converter o vídeo para WebP usando ffmpeg
    await new Promise<void>((resolve, reject)=> {
      ffmpeg(tempVideoPath)
      .output(tempWebpPath)
      .on('end',()=> {
        console.log('Video converted to WebP');
        resolve();
      })
      .on('error', (err)=> {
        console.log('Error converting video to WebP', err);
        reject();
      })
      .run();
    })

    // ler o arquivo WebP convertido
    const webpBuffer = fs.readFileSync(tempWebpPath);
    const webpBase64 = webpBuffer.toString('base64');

    console.log(webpBase64);
    

    

    await client.sendImageAsStickerGif(message.from, media).then(() => { 
      console.log('Sticker sent to', message.from);
    });

  }
}