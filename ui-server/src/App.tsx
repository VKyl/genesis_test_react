import Layout from "@layout/Layout";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "./utils/constants.ts";
import '@styles/App.css';
import {io} from "socket.io-client";
import {Authorize} from "./utils/auth.ts";
import {AuthProvider} from "./components/AuthContextProvider.tsx";

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
export const socket = io(`http://localhost:${SERVER_PORT}`, {autoConnect: false})

function App() {
    const [user, setUser] = useState<User | null>()
    useEffect(() => {
        if(!user?.u_id)
            Authorize(setUser)
        console.log(user)
    }, [user]);
    return (
        <AuthProvider user={user}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
