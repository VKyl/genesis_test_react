import {MessageResponseDto} from "./message";
import mongoose from "mongoose";

export interface ChatResponseDTO {
  _id: string;
  users: string[];
  messages: MessageResponseDto[];
}

export interface ChatViewDTO extends mongoose.Document {
    users: string[];
}
