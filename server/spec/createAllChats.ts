import {DatabaseService} from "../services/database-service";
import {DB_COLLECTIONS} from "../services/constants";
import http from "http";
import {chatRequestOptions} from "../constants";

export const createAllChats = async (u_id: string) => {
    const users = await DatabaseService.instance.getCollection(DB_COLLECTIONS.USERS);

    if (!users) return;

    for (const user of users) {
        if (user._id.equals(u_id)) continue;
        await new Promise<void>((resolve, reject) => {
            const req = http.request(chatRequestOptions,
                (res) =>
                {
                    res.on("data", () => {});
                    res.on("end", resolve);
                });

            req.write(JSON.stringify({
                u1_id: u_id,
                u2_id: user._id.toHexString()
            }));

            req.on("error", (err) => {
                console.error("Request error:", err);
                reject(err);
            });

            req.end();
        });
    }
};
