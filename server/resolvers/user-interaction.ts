import {SocketType} from "../constants";
import {NOTIFICATION_TYPE} from "../services/constants";
import {SessionService} from "../services/session-service";


export const setUserInteractions = async (socket: SocketType) => {
    socket.on(NOTIFICATION_TYPE.MESSAGE, (message: string) => {
        try {
            const {receiver_id, ...payload} = JSON.parse(message)
            SessionService.instance.notify({
                type: NOTIFICATION_TYPE.MESSAGE,
                payload: payload
            }, receiver_id)
        }
        catch (error) {
            socket.emit(NOTIFICATION_TYPE.MESSAGE, error);
        }
    })
}