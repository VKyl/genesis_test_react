import '@styles/ChatsSidebar.css'
import SearchFilter from "@components/SearchFilter.tsx";
import React from "react";
import {useSelect} from "@hooks/useSelect.ts";
import {ChatResponseDTO} from "../api/chats.ts";
import ChatCard from "../components/ChatCard.tsx";
import {useChatsList} from "../hooks/useChatsList.ts";


const ChatsSidebar = () => {
    const {parentRef: tabsRef, handleListSelect: tabsListSelect} = useSelect();
    const {data, error, isLoading} = useChatsList()

    if (isLoading)
        return <div>Loading...</div>;

    if (error)
        return <div>Error: {error.message}</div>;

    return <aside>
        <ul className="tabs" ref={tabsRef} onClick={(e) => tabsListSelect(e)}>
            <li className="selected" ><p>Online</p></li>
            <li>All chats</li>
        </ul>
        <ul className="chats">
            {!data.length ? <EmptyChatCards/> : <ChatCards chats={data}/>}
        </ul>
        <SearchFilter/>
    </aside>
}

const EmptyChatCards = () => (
    <p style={{alignSelf: "center", marginTop: "15px", color: "#d8d8d0"}}>No chats</p>
)

const ChatCards = ({chats}: { chats: ChatResponseDTO[] }) => {
    return chats.map((chat: any, index: number) => (
                <li key={index} className={resolveChatCardClass(index)}>
                    <ChatCard  {...chat["users"][0]} index={index} lastMessage={chat.lastMessage} is_online={chat.is_online}/>
                </li>
            ))
}

export const resolveChatCardClass = (index: number) => {
   return window.location.pathname == `/chats/${index}` ? "selected" : ""
}

export default ChatsSidebar