import "@styles/ChatCard.css"
import {useLocation, useNavigate} from "react-router-dom";
import {ChatCardType} from "../api/chats.ts";

const ChatCard = ({...chat}: ChatCardType) => {
    const navigate = useNavigate();
    let itemClass = resolveChatCardClass(chat._id)
    const navigateToChat = () => {
        navigate(`/chats/${chat._id}`, {state: {...chat}})
    }

    return (<li className={itemClass}>
                <div onClick={() => navigateToChat()} className={"chat-card"}>
                    <div className={"avatar-wrapper" + (chat.is_online ? " online" : "")}>
                        <img src={"/"+chat.image} alt="avatar"/>
                    </div>
                    <div className="info">
                        <p><strong>{chat.name}</strong></p>
                        <p className="last-message">{chat.lastMessage.slice(0, 35) + "..."}</p>
                    </div>
                </div>
            </li>)
}

export const resolveChatCardClass = (id: string) => {
    const location = useLocation();
    return location.pathname == `/chats/${id}` ? "selected" : ""
}

export default ChatCard;