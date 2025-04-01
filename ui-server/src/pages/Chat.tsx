import '@styles/Chat.css'
import Message, {MessageProps} from "../components/Message.tsx";
import MessageInput from "../components/MessageInput.tsx";
import {memo} from "react";
import {useVirtualizerBottomScroll} from "../hooks/useVirtualizerBottomScroll.ts";
import {useLocation} from "react-router-dom";

 const messages: MessageProps[] = [{sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true}]


const Chat = () => {
    const location = useLocation();
    const user = location.state || {};
    const {virtualItems,
        virtualizer,
        bottomRef} = useVirtualizerBottomScroll(messages)

    return (
        <div className="chat">
            <div className="chat-header">
                <img src="/avatar1.png" alt="avatar"/>
                <div className="chatter-info">
                    <h3>Placeholder name</h3>
                </div>
            </div>
            <div className="chat-window">
                {virtualItems.map(({index, key}) => (
                        <div key={key} data-index={index}
                            className={"message-wrapper"}
                             ref={virtualizer.measureElement}>
                            <Message  {...messages[index]}/>
                        </div>
                    )
                )}
                <div ref={bottomRef}></div>
            </div>
            <MessageInput/>
        </div>
    )
}

export default memo(Chat);