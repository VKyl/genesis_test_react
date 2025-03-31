import "@styles/ChatCard.css"
import {Link} from "react-router-dom";

export interface ChatCardProps {
    name: string;
    id: string;
    lastMessage: string;
}

const ChatCard = () => {

    return (<Link to={`/chat/1`} className={"chat-card"}>
            <div className="avatar-wrapper">
                <img src="/avatar3.png" alt="avatar"/>
            </div>
            <div className="info">
                <p><strong>User name</strong></p>
                <p className="last-message">Some last message...</p>
            </div>
        </Link>)
}

export default ChatCard;