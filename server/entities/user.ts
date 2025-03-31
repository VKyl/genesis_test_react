import {MessageResponseDto, MessageViewDto} from "./message";
import {now} from "mongoose";
import {Socket} from "socket.io";

export interface UserResponseDTO {
    _id: string;
    name: string;
    is_bot: boolean;
    image: string;
}


export interface UserViewDTO {
    name: string;
}

export const parseUserDocument = (userDocument: any): UserResponseDTO => (
    {
        _id: userDocument._id,
        name: userDocument.name,
        is_bot: userDocument.is_bot,
        image: userDocument.image,
    }
)

export type botMessageBuilder = (message: string) => string;

export class Bot{
    id: string = "";
    name: string;
    handlers: any;
    private readonly builder: botMessageBuilder;
    constructor(name: string, builder: botMessageBuilder, handlers: any) {
        this.name = name;
        this.builder = builder;
        this.handlers = handlers;
    }

    handler(message: MessageResponseDto): MessageViewDto {
        return {
            sender_id: this.id,
            timestamp: now().toISOString(),
            message: this.builder(message.message),
            receiver_id: message.sender_id
        }
    }

    setUpHandlers(socket: Socket){
        this.handlers(socket, this);
    }
}
