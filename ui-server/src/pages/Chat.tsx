import {useParams} from "react-router-dom";
import '@styles/Chat.css'
import {useWindowVirtualizer} from "@tanstack/react-virtual";
import Message, {MessageProps} from "../components/Message.tsx";
import MessageInput from "../components/MessageInput.tsx";
import {memo, useEffect, useRef} from "react";

 const messages: MessageProps[] = [{sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true}]


const Chat = () => {
    const params = useParams();
    const bottomRef = useRef<HTMLDivElement>(null);
    const virtualizer = useWindowVirtualizer({
        count: messages.length,
        estimateSize: () => 100,

    })
    const virtualItems = virtualizer.getVirtualItems()
    useEffect(() => {
            requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView();
            });
    }, [virtualizer.getVirtualItems()])
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