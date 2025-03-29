import {DatabaseService} from "../services/database-service";
import {DB_COLLECTIONS} from "../services/constants";
import {Types} from "mongoose";
import {parseUserDocument} from "../entities/user";

export const getUserInfoById = async (u_id: string) =>
    DatabaseService.instance.getEntityById(u_id, DB_COLLECTIONS.USERS)

export const getUsersByIds = async (users: Types.ObjectId[], u_id?: Types.ObjectId) => {
    return Promise.all(
        users.filter(user_id => !user_id.equals(u_id))
            .map(async (user_id) =>
                parseUserDocument(await getUserInfoById(user_id.toString()))
            )
    )
}