import {Types} from "mongoose";

export interface MessageResponseDto {
    sender_id: string,
    message: string,
    timestamp: string,
}

export interface MessageDAO {
    sender_id: Types.ObjectId,
    message: string,
    timestamp: string,
}

export interface MessageViewDto {
    sender_id: string,
    message: string,
    timestamp: string,
    receiver_id: string,
}
