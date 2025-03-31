import {NOTIFICATION_TYPE, User} from "./constants.ts";
import {genericName} from "./authUtils.ts";
import {socket} from "../App.tsx";

const USER_STORAGE_KEY = "USER_STORAGE_KEY";

export const Authorize = (onAuth: (value: User) => void) => {
    try {
        const name = authQueryResolver();
        connect()
        RegistrationResolver(name, onAuth)
    }catch(e) {
        console.log(e)
        alert("Failed to connect, refresh the page")
    }
}

const connect = () => {
    socket.connect();
    socket.on('disconnect', () => {
        localStorage.removeItem(USER_STORAGE_KEY);
        window.location.reload();
    })
}

const authQueryResolver = (): string =>{
    const user: User = fetchLocalStorage(USER_STORAGE_KEY);
    let name = user?.name;
    if (!!user?.u_id && !!name) {
        socket.io.opts.query = {id: user?.u_id}
        return name;
    }
    name = genericName()
    socket.io.opts.query = {name: name};
    return name;
}

const RegistrationResolver = (name:string, onAuth: (value: User) => void) => {
    socket.on(NOTIFICATION_TYPE.AUTHORIZED, (res) => {
            if(!res?.id) return alert("Authorization failed, try cleaning localStorage");
            const user = {name: name, u_id: res.id}
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
            onAuth(user)
        })
}

export const fetchLocalStorage = (KEY: string) => {
    const item = localStorage.getItem(KEY)
    return item ? JSON.parse(item) : null
}
