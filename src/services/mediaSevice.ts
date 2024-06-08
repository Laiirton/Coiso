import { Whatsapp, Message } from "@wppconnect-team/wppconnect";

export async function stickerCreator(client: Whatsapp, message: Message) {
  if (message.isMedia || message.type === 'image' || message.type === 'video') {
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
}