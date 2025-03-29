import {DatabaseService} from "../services/database-service";
import {DB_COLLECTIONS} from "../services/constants";
import {ParsedUrlQuery} from "node:querystring";
import {IMAGES} from "../constants";

const genericAvatar = () => IMAGES[Math.floor(Math.random() * IMAGES.length)];

const createUser = async (user: ParsedUrlQuery) => {
    try{
        const doc = {
            name: user.name,
            is_bot: !!user.is_bot,
            image: genericAvatar()
        };
        return await DatabaseService.instance
        .createEntity(doc, DB_COLLECTIONS.USERS)
        .then(res => res?.insertedId)
        .catch(() => null)
    }
    catch(err){
        return null
    }

}
const authUser = async (u_id: string) => (await DatabaseService.instance
    .getEntityById(u_id, DB_COLLECTIONS.USERS))?._id

export const userAuthResolver = async (user: ParsedUrlQuery) => {
    if(!user.id) return createUser(user);
    return authUser(user.id as string);
}