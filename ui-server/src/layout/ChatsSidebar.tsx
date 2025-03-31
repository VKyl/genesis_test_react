import '@styles/ChatsSidebar.css'
import ChatCard from "../components/ChatCard.tsx";
import SearchFilter from "../components/SearchFilter.tsx";

const ChatsSidebar = () => {

    return <aside>
        <ul className="tabs">
            <li className="selected">Online</li>
            <li>All chats</li>
        </ul>
        <ul className="chats">
            <li>
                <ChatCard/>
            </li>
        </ul>
        <SearchFilter/>
    </aside>
}

export default ChatsSidebar