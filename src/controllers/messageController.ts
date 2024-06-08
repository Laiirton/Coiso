import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { sendSticker } from '../services/mediaSevice';

// Extende a interface Message para incluir a propriedade caption
interface ExtendedMessage extends Message {
  caption?: string;
}

export async function processMessage(client: Whatsapp, message: ExtendedMessage) {
  const contact = await client.getContact(message.from);
  const senderName = contact?.pushname || message.from;
  const caption = message.caption;


  console.log(message);


  if (caption === "!fig") {
    await sendSticker(client, message);
  }
}
