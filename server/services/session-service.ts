import {NOTIFICATION_TYPE, NotificationMessage} from "./constants";
import {SocketType} from "../constants";
import {DatabaseService} from "./database-service";

export class SessionService {
    protected _userSockets: Record<string, SocketType | null> = {};
    static #instance: SessionService;
    private constructor() {}

    public static get instance(): SessionService {
        if (!SessionService.#instance) {
            SessionService.#instance = new SessionService();
        }
        return SessionService.#instance;
    }

    public get userSockets(){
        return Object.values(this._userSockets);
    }

    // public addUser(userSocket: SocketType, type: NOTIFICATION_TYPE =  NOTIFICATION_TYPE.CONNECTED){
    public addUser(userSocket: SocketType){
        this.broadcastAll({
            type: NOTIFICATION_TYPE.CONNECTED,
            payload: {userId: userSocket.data.u_id}
        })
        this._userSockets[userSocket.data.u_id] = userSocket;
    }

    public disconnectUser(u_id: string){
        // this.userSockets = this.userSockets
            // .filter(userSocket => userSocket.data.u_id !== u_id)
        this._userSockets[u_id] = null;

        this.broadcastAll({
            type: NOTIFICATION_TYPE.DISCONNECTED,
            payload: {userId: u_id}
        })
    }

    public notify<T>(message: NotificationMessage<T>, receiver_id: string){
        const userSocket: SocketType | null | undefined = Object.values(this._userSockets)
            .find(userSocket => userSocket?.data.u_id === receiver_id)
        if (!userSocket) return
        userSocket.emit(message.type, message.payload)
    }

    public broadcastAll<T>(message: NotificationMessage<T>){
        Object.values(this._userSockets).forEach(userSocket =>
            userSocket?.emit(message.type, message.payload)
        )
    }

    public isLoggedInSession(u_id: string){
        return !!this._userSockets[u_id]
    }
}