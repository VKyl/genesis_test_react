import {Bot} from "../entities/user";
import {io} from "socket.io-client";
import {NOTIFICATION_TYPE} from "../services/constants";
import {MessageResponseDto} from "../entities/message";
import http from "http";
import {messageRequestOptions} from "../constants";
import {Socket} from "socket.io";
import {SessionService} from "../services/session-service";

const reverseString = (str: string): string => {
    let res = ""
    for (let i = str.length - 1; i >= 0; i--) res += str[i];
    return res;
}

const defaultBotHandlers = (socket: Socket, bot: Bot) => {
    socket.on(NOTIFICATION_TYPE.MESSAGE, (message: MessageResponseDto) => {
            const req = http.request(messageRequestOptions)
            req.write(JSON.stringify(bot.handler(message)))
            req.on("error", (err) => {
                console.log(err)
            })
            req.end()
    })
}

const spamBotHandlers = (socket: Socket, bot: Bot) => {
    const MIN_TIMEOUT = 1000
    const MAX_TIMEOUT = 12000
    const sendMessage = (u_id: string) => {
        const req = http.request(messageRequestOptions)
        const message = {sender_id: u_id, message: "", timestamp: Date.now().toString()}
        req.write(JSON.stringify(bot.handler(message)))
        req.on("error", (err) => {
            console.log(err)
        })
        req.end()
    }
    const spamActiveUsers = () => {
        for(let user of SessionService.instance.userSockets){
            if(user && !user.data.is_bot)
                sendMessage(user.data.u_id)
        }
        const time = Math.floor(Math.random()*(MAX_TIMEOUT-MIN_TIMEOUT)) + MIN_TIMEOUT
        setTimeout(() => spamActiveUsers(), time)
    }

    spamActiveUsers()
}

const BOTS = [
    new Bot("Echo Bot", (message: string) => message, defaultBotHandlers),
    new Bot("Reverse Bot",  (message: string) => reverseString(message), defaultBotHandlers),
    new Bot("Ignore Bot", () => "", () => {}),
    new Bot("Spam Bot", () => "I'll spam you!", spamBotHandlers),
]

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
