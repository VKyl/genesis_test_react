import '@styles/Chat.css'
import Message, {MessageProps} from "../components/Message.tsx";
import MessageInput from "../components/MessageInput.tsx";
import {memo, useContext, useEffect, useRef} from "react";
import {Location, useLocation} from "react-router-dom";
import {useChatInfo} from "../hooks/useChatInfo.ts";
import {ChatCardType, MessageResponseDTO} from "../api/chats.ts";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {User} from "../utils/constants.ts";


const Chat = () => {
    const user = useContext(AuthContext);
    const location: Location<ChatCardType> = useLocation();
    const {data} = useChatInfo(location.state?._id)
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef?.current?.scrollIntoView();
    }, [data])

    return (
        <div className="chat">
            <div className="chat-header">
                <img src={"/" + location.state.image} alt="avatar" height={125} width={125} />
                <div className="chatter-info">
                    <h3>{location.state.name}</h3>
                </div>
            </div>
            <div className="chat-window">
                {data?.messages.map((message, index) => (
                    <Message key={message.sender_id+index}  {...getMessageProps(user as User, location, message)}/>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <MessageInput receiver_id={location.state._id}/>
        </div>
    )
}

const getMessageProps = (user: User,location: Location<ChatCardType>, message: MessageResponseDTO): MessageProps =>{
    return {
        sender_name: (message.sender_id === user?.u_id ? user.name : location.state.name) as string,
        ...message
    }
}

export default memo(Chat);