import {BASE_URL, User} from "../utils/constants.ts";

export interface UserResponseDTO {
    id: string,
    name: string
    image: string
}

export const chatsQuery = async (user: User) => {
        const response = await fetch(BASE_URL + `/chats?u_id=${user?.u_id}`);
        return await response.json();
    }

export interface ChatResponseDTO {
    users: UserResponseDTO,
    lastMessage: string,
    is_online: boolean,
}

export type ChatCardType = {
        name: string;
        id: string;
        image: string;
        lastMessage: string;
        is_online: boolean;
}