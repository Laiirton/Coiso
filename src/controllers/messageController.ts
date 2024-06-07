import { Whatsapp } from '@wppconnect-team/wppconnect';


export async function processMessage(client: Whatsapp, message: any)
{
  const contact = await client.getContact(message.from)
  console.log(`Mensagem de ${contact?.pushname}: ${message.body}`)

}