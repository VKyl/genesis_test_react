import {DatabaseService} from "../../services/database-service";
import {DB_COLLECTIONS, NOTIFICATION_TYPE} from "../../services/constants";
import {ParsedUrlQuery} from "node:querystring";
import {genericAvatar, IMAGES, SocketType} from "../../constants";
import {SessionService} from "../../services/session-service";

const createUser = async (user: ParsedUrlQuery) => {
    try{
        const doc = {
            name: user.name,
            is_bot: !!user.is_bot,
            image: genericAvatar()
        };
        return await DatabaseService.instance.createEntity(doc, DB_COLLECTIONS.USERS)
        .then(res => {
            return res?.insertedId
        })
        .catch(() => null)
    }
    catch(err){
        console.log(err)
        return null
    }
}
const authUser = async (u_id: string) =>
    (DatabaseService.instance.getEntityById(u_id, DB_COLLECTIONS.USERS))
        .then(user => user?._id)
        .catch(() => null);

export const userAuthResolver = async (user: ParsedUrlQuery) => {
    if(!user.id) return createUser(user);
    return authUser(user.id as string);
}

export const authorize = (socket: SocketType, u_id: any) => {
        if (!u_id) return socket.disconnect()
        socket.data.u_id = u_id.toHexString()
        socket.emit(NOTIFICATION_TYPE.AUTHORIZED, {id: socket.data.u_id})
        SessionService.instance.addUser(socket);
}
