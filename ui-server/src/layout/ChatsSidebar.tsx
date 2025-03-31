import '@styles/ChatsSidebar.css'
import ChatCard from "@components/ChatCard.tsx";
import SearchFilter from "@components/SearchFilter.tsx";
import React, {memo} from "react";
import {useSelect} from "@hooks/useSelect.ts";

const cards: number[] = [1] as number[];

const ChatsSidebar = () => {
    const {parentRef: tabsRef, handleListSelect: tabsListSelect} = useSelect();
    return <aside>
        <ul className="tabs" ref={tabsRef} onClick={(e) => tabsListSelect(e)}>
            <li className="selected" ><p>Online</p></li>
            <li>All chats</li>
        </ul>
        <ul className="chats">
            <EmptyChats/>
            {cards.map((route, index) => (
                <li key={index} className={window.location.pathname == `/chats/${route}` ? "selected" : ""}>
                    <ChatCard/>
                </li>
            ))}
        </ul>
        <SearchFilter/>
    </aside>
}

const EmptyChats = () => (
    <>{!cards.length && <p style={{alignSelf: "center", marginTop: "15px", color: "#d8d8d0"}}>No chats</p>}</>
)

export default memo(ChatsSidebar)