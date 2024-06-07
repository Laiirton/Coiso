import { Whatsapp } from '@wppconnect-team/wppconnect';

interface Contact 
{
  pushname?: string;
}

interface Message
{
  from: string;
  body: string;
}

export async function processMessage(client: Whatsapp, message: Message)
{
  const contact: Contact | undefined = await client.getContact(message.from);
  console.log(`Message received from ${contact?.pushname}: ${message.body}`)


}