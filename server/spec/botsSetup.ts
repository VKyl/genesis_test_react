import {Bot} from "../entities/user";
import {io} from "socket.io-client";
import {NOTIFICATION_TYPE} from "../services/constants";
import {MessageResponseDto} from "../entities/message";
import http from "http";
import {botRequestOptions} from "../constants";
import {Socket} from "socket.io";

const reverseString = (str: string): string => {
    let res = ""
    for (let i = str.length - 1; i > 0; i--) res += str[i];
    return res;
}

const defaultBotHandlers = (socket: Socket, bot: Bot) => {
    socket.on(NOTIFICATION_TYPE.MESSAGE, (message: MessageResponseDto) => {
            const req = http.request(botRequestOptions)
            req.write(JSON.stringify(bot.handler(message)))
            req.on("error", () => {})
            req.end()
        })
}

const BOTS = [
    new Bot("Echo Bot", (message: string) => message, defaultBotHandlers),
    new Bot("Reverse Bot",  (message: string) => reverseString(message), defaultBotHandlers),
    new Bot("Ignore Bot", () => "", () => {})
]

const spamBot = new Bot("Spam Bot", () => "Spam message", () => {});

export const setupBots = () => {
    BOTS.forEach(bot => {
        const socket: any = io(`http://localhost:${process.env.SERVER_PORT}`,
            {query: {name: bot.name, is_bot: true}});

        socket.on("connect", () => {
            console.log(`${bot.name} connected`);
        })

        socket.on(NOTIFICATION_TYPE.AUTHORIZED, (res: any) => {
            bot.id = res.id;
        })

        bot.setUpHandlers(socket)

        socket.on("disconnect", () => {
            console.log(`${bot.name} disconnected`);
        })
    })
}
