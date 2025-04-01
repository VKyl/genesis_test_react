import '@styles/ChatsSidebar.css'
import SearchFilter from "@components/SearchFilter.tsx";
import React, {useState} from "react";
import {useSelect} from "@hooks/useSelect.ts";
import {ChatListItemResponseDTO} from "../api/chats.ts";
import ChatCard from "../components/ChatCard.tsx";
import {useChatsList} from "../hooks/useChatsList.ts";

type Filters = {
    strictOnline: boolean,
    stringQuery: string
}

const ChatsSidebar = () => {
    const {
        data_attribute: is_online,
        parentRef: tabsRef,
        handleListSelect: tabsListSelect
    } = useSelect();

    const [nameFilter, setNameFilter] = useState<string>("");
    const {data, error, isLoading} = useChatsList()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <aside>
        <ul className="tabs" ref={tabsRef} onClick={(e) => tabsListSelect(e)}>
            <li data-value="1">Online</li>
            <li className="selected">All chats</li>
        </ul>
        <ul className="chats">
            {!data?.length ? (
                <EmptyChatCards/>
                ):(
                <ChatCards chats={data} filters={{stringQuery: nameFilter, strictOnline: !!is_online} as Filters}/>)}
        </ul>
        <SearchFilter filter={nameFilter} setFilter={setNameFilter}/>
    </aside>
}

const EmptyChatCards = () => (
    <p style={{alignSelf: "center", marginTop: "15px", color: "#d8d8d0"}}>
        No chats
    </p>
)

const ChatCards = ({chats, filters}: { chats: ChatListItemResponseDTO[], filters: Filters}) => {
    return chats
        .filter((chat) => validateFilters(chat, filters))
        .map((chat, index: number) => (
                <ChatCard key={index + chat.lastMessage}
                    {...chat["users"][0]}
                    lastMessage={chat.lastMessage}
                    is_online={chat.is_online}
                />
            ))
}

const validateFilters = (chat: ChatListItemResponseDTO, filters: Filters) =>{
    const name = chat.users[0].name
    const nameMatch = name?.toLowerCase().includes(filters.stringQuery?.toLowerCase().trim())
    const statusMatch = !filters.strictOnline || chat.is_online
    return statusMatch && nameMatch;
}

export default ChatsSidebar