import {IncomingMessage, ServerResponse} from "http";
import {MessageViewDto, messageViewProps} from "../entities/message";

const parseMessage = (data: any): MessageViewDto | null => {
    if (typeof data !== "object" || data === null) return null;

    let parsedData: Record<string, any> = {};
    for (let prop of messageViewProps) {
        if (!data[prop] || typeof data[prop] !== "string") return null;
        parsedData[prop] = data[prop];
    }
    return parsedData as MessageViewDto;
}

export const setUserMessageReceiving = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== "POST") return res.writeHead(404, "Method Not Found");
    const message = parseMessage(req);
}