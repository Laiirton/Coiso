import { createWhatsappClient } from "./utils/whatsappClient";


async function main()
{
    const client = await createWhatsappClient();
    console.log('Client started:', client);
}

main();