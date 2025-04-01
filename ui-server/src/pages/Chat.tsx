import '@styles/Chat.css'
import Message, {MessageProps} from "../components/Message.tsx";
import MessageInput from "../components/MessageInput.tsx";
import {memo, useContext} from "react";
import {useVirtualizerBottomScroll} from "../hooks/useVirtualizerBottomScroll.ts";
import {Location, useLocation} from "react-router-dom";
import {useChatInfo} from "../hooks/useChatInfo.ts";
import {ChatCardType, ChatResponseDTO, MessageResponseDTO} from "../api/chats.ts";
import {AuthContext} from "../components/AuthContextProvider.tsx";
import {User} from "../utils/constants.ts";


const Chat = () => {
    const user = useContext(AuthContext);
    const location: Location<ChatCardType> = useLocation();
    const {data} = useChatInfo(location.state?._id)
    const {virtualItems,
        virtualizer,
        bottomRef} = useVirtualizerBottomScroll(data as ChatResponseDTO)

    if (!data) return <div>Loading...</div>;

    return (
        <div className="chat">
            <div className="chat-header">
                <img src={"/" + location.state.image} alt="avatar"/>
                <div className="chatter-info">
                    <h3>{location.state.name}</h3>
                </div>
            </div>
            <div className="chat-window">
                {virtualItems.map(({index, key}) => (
                        <div key={key} data-index={index}
                            className={"message-wrapper"}
                             ref={virtualizer.measureElement}>
                            <Message  {...getMessageProps(user as User, location, data.messages[index])}/>
                        </div>
                    )
                )}
                <div ref={bottomRef}></div>
            </div>
            <MessageInput receiverId={location.state._id}/>
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