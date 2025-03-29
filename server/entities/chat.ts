import {MessageResponseDto} from "./message";
import mongoose from "mongoose";
import {UserResponseDTO} from "./user";

export interface ChatResponseDTO {
  _id: string;
  users: UserResponseDTO[];
  lastMessage: MessageResponseDto;
}

export interface ChatViewDTO extends mongoose.Document {
    users: string[];
}
