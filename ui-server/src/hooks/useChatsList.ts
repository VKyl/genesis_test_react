import {Dispatch, SetStateAction, useContext} from "react";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {User} from "../utils/constants.ts";
import {useQuery} from "@tanstack/react-query";
import {ChatResponseDTO, chatsQuery} from "../api/chats.ts";

export const useChatsList = () => {
    const user = useContext(AuthContext) as User;
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["chats"], queryFn: () => chatsQuery(user), refetchOnWindowFocus: false
    });
    return {data, error, isLoading, refetch}
}