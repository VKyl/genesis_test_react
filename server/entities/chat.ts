import {MessageResponseDto} from "./message";

export interface ChatResponseDTO {
  _id: string;
  users: string[];
  messages: MessageResponseDto[];
}

export interface ChatViewDTO {
    users: string[];
}
