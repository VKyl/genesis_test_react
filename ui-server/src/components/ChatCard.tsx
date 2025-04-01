import "@styles/ChatCard.css"
import {useNavigate} from "react-router-dom";
import {ChatCardType} from "../api/chats.ts";

const ChatCard = ({...chat}: ChatCardType) => {
    const navigate = useNavigate();
    const navigateToChat = () => {
        navigate(`/chats/${chat._id}`, {state: {...chat}})
    }

    return (<div onClick={() => navigateToChat()} className={"chat-card"}>
            <div className={"avatar-wrapper" + (chat.is_online ? " online" : "")}>
                <img src={"/"+chat.image} alt="avatar"/>
            </div>
            <div className="info">
                <p><strong>{chat.name}</strong></p>
                <p className="last-message">{chat.lastMessage.slice(0, 35) + "..."}</p>
            </div>
        </div>)
}

export default ChatCard;