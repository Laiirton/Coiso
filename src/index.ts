import { createWhatsappClient } from "./utils/whatsappClient";
import { processMessage } from "./controllers/messageController";

async function main() {
  const client = await createWhatsappClient();

  client?.onMessage((message) => {
    processMessage(client, message);
  });
}

main();
