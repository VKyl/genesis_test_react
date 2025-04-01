import {useContext, useEffect} from "react";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {User} from "../utils/constants.ts";
import {useQuery} from "@tanstack/react-query";
import {chatsQuery} from "../api/chats.ts";
import {socket} from "../App.tsx";

export const useChatsList = () => {
    const user = useContext(AuthContext) as User;
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["chats"], queryFn: async() => chatsQuery(user), refetchOnWindowFocus: false
    });
    useEffect(() => {
        socket.onAny(() => refetch())
    }, [])
    return {data, error, isLoading}
}