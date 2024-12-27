import { Call, Client, LocalAuth, Message } from "whatsapp-web.js";
import * as qrcode from 'qrcode-terminal';



export interface CommanderPlugin {
    init(client: Client): Promise<void>
    onMessage(msg: Message): Promise<void>
    onCall(call: Call): Promise<void>
}

// Emergency
// Group helper
// Auto Replyer
export class ChatCommanderBus {
    plugins: CommanderPlugin[];
    client: Client;
    constructor(client) {
        this.client = client
        this.plugins = []
    }

    add_plugin(plugin: CommanderPlugin) {
        this.plugins.push(plugin)
    }


    async start() {
        console.log('Initilizing.')

        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('message', async (m) =>{
            await Promise.all(this.plugins.map(p => p.onMessage(m)))
        })

        this.client.on('call', async (c) =>{
            await Promise.all(this.plugins.map(p => p.onCall(c)))
        })
        
        this.client.initialize()

        return new Promise<void>((resolve) => {
            this.client.once('ready', async () => {
                await Promise.all(this.plugins.map(p => p.init(this.client)))
                resolve()
            })


        })
    }
}




