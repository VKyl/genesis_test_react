import {useContext, useEffect} from "react";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {NOTIFICATION_TYPE, User} from "../utils/constants.ts";
import {useQuery} from "@tanstack/react-query";
import {chatInfoQuery, MessageResponseDTO} from "../api/chats.ts";
import {socket} from "../App.tsx";

export const useChatInfo = (u2_id: string) => {
    const user = useContext(AuthContext) as User;
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [`chat${u2_id}`], queryFn: async() =>
            chatInfoQuery(user.u_id as string, u2_id),
            refetchOnWindowFocus: false
    });
    useEffect(() => {
        socket.on(NOTIFICATION_TYPE.MESSAGE,(message: MessageResponseDTO) => {
            console.log("here")
            if([u2_id, user.u_id].includes(message.sender_id)) refetch()
        })
    }, [])
    return {data, error, isLoading}
}