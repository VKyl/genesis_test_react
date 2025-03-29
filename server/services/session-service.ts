import {NOTIFICATION_TYPE, NotificationMessage} from "./constants";
import {SocketType} from "../constants";
import {UserResponseDTO} from "../entities/user";

export class SessionService {
    protected userSockets: SocketType[] = [];
    static #instance: SessionService;
    private constructor() {}

    public static get instance(): SessionService {
        if (!SessionService.#instance) {
            SessionService.#instance = new SessionService();
        }
        return SessionService.#instance;
    }

    // public addUser(userSocket: SocketType, type: NOTIFICATION_TYPE =  NOTIFICATION_TYPE.CONNECTED){
    public addUser(userSocket: SocketType, user: UserResponseDTO){
        this.broadcastAll({
            type: NOTIFICATION_TYPE.CONNECTED,
            payload: user
        })
        this.userSockets.push(userSocket);
    }

    public disconnectUser(u_id: string){
        this.userSockets = this.userSockets
            .filter(userSocket => userSocket.data.u_id !== u_id)

        this.broadcastAll({
            type: NOTIFICATION_TYPE.DISCONNECTED,
            payload: {userId: u_id}
        })
    }

    public notify<T>(message: NotificationMessage<T>, receiver_id: string){
        const userSocket: SocketType | undefined = this.userSockets
            .find(userSocket => userSocket.data.u_id === receiver_id)
        if (!userSocket) return
        userSocket.emit(message.type, message.payload)
    }

    public broadcastAll<T>(message: NotificationMessage<T>){
        this.userSockets.forEach(userSocket =>
            userSocket.emit(message.type, message.payload)
        )
    }
}