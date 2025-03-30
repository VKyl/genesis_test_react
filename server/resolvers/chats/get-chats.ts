import {Request, Response} from 'express';
import {Types} from "mongoose";
import {DatabaseService} from "../../services/database-service";
import {DB_COLLECTIONS} from "../../services/constants";
import {validateRequest} from "../../constants";
import {ChatResponseDTO} from "../../entities/chat";
import {getUsersByIds} from "../user/user-data";

export const getChats = async (req: Request, res: Response) => {
    try {
        validateRequest(req);

        const userId = new Types.ObjectId(req.query.u_id as string);

        const chats = await DatabaseService.instance.getEntityGroupByQuery(
            { users: { $elemMatch: {$eq: userId} } },
            DB_COLLECTIONS.CHATS
        ) || [];
        const parsedChats: ChatResponseDTO[] = await Promise.all(
            chats.map(async (chat) => ({
                users: await getUsersByIds(chat.users, userId),
                lastMessage: chat.messages[chat.messages.length - 1] || "No messages found",
            } as ChatResponseDTO)),
        );
        res.status(200).json(parsedChats);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

export const getChat = async (req: Request, res: Response) => {
    try {
        validateRequest(req);

        const {u1_id, u2_id} = req.query;
        const parsedIds = [
            new Types.ObjectId(u1_id as string),
            new Types.ObjectId(u2_id as string)
        ];

        const chat = await DatabaseService.instance.getEntityByQuery(
            {users: {$all: parsedIds}},
            DB_COLLECTIONS.CHATS
        )

        res.status(200).json(chat);
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
