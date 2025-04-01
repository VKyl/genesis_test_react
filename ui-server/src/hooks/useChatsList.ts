import {useContext, useEffect} from "react";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {NOTIFICATION_TYPE, User} from "../utils/constants.ts";
import {useQuery} from "@tanstack/react-query";
import {chatsQuery} from "../api/chats.ts";
import {socket} from "../App.tsx";

export const useChatsList = () => {
    const user = useContext(AuthContext) as User;
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["chats"], queryFn: () => chatsQuery(user), refetchOnWindowFocus: false
    });
    useEffect(() => {
        socket.on(NOTIFICATION_TYPE.GET_CHATS, () => refetch())
        socket.on(NOTIFICATION_TYPE.AUTHORIZED, () => window.location.reload())
        socket.on(NOTIFICATION_TYPE.DISCONNECTED, () => refetch())
        socket.on(NOTIFICATION_TYPE.CONNECTED, () => refetch())
    }, [])
    return {data, error, isLoading}
}