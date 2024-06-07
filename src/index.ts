import { createWhatsappClient } from "./utils/whatsappClient";


async function main() {
  const client = await createWhatsappClient();

  client?.onMessage((message ) => {
    console.log('Mensagem recebida:', message.body)
  })

}


main();