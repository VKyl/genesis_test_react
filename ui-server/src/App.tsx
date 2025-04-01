import Layout from "@layout/Layout";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {BASE_URL, User} from "./utils/constants.ts";
import '@styles/App.css';
import {io} from "socket.io-client";
import {Authorize} from "./utils/auth.ts";
import {AuthProvider} from "./components/AuthContextProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const socket = io(BASE_URL, {autoConnect: false})
const queryClient = new QueryClient()

function App() {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        if(!user?.u_id)
            Authorize(setUser)
    }, [user]);

    return (
        <AuthProvider user={user}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default App
