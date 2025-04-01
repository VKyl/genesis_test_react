import {BASE_URL, User} from "../utils/constants.ts";

export interface UserResponseDTO {
    id: string,
    name: string
    image: string
}


export type ChatCardType = {
        name: string;
        _id: string;
        image: string;
        lastMessage: string;
        is_online: boolean;
}


export interface ChatResponseDTO {
    _id: string;
    users: string[],
    messages: MessageResponseDTO[]
}

export interface MessageResponseDTO{
    sender_id: string,
    message: string,
    timestamp: string,
}

export const chatsQuery = async (user: User): Promise<ChatListItemResponseDTO[]> => {
        const response = await fetch(BASE_URL + `/chats?u_id=${user?.u_id}`);
        return await response.json();
}

export interface ChatListItemResponseDTO {
    users: UserResponseDTO,
    lastMessage: string,
    is_online: boolean,
}

const chatQuery = async (u1_id: string, u2_id: string): Promise<ChatResponseDTO> => {
    const response = await fetch(BASE_URL + `/chat?u1_id=${u1_id}&u2_id=${u2_id}`);
    return await response.json();
}