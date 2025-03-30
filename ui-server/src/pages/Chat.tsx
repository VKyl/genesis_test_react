import {useParams} from "react-router-dom";
import '@styles/Chat.css'
import Message, {MessageProps} from "../components/Message.tsx";
import Input from "../components/Input.tsx";
import {useWindowVirtualizer} from "@tanstack/react-virtual";

const Chat = () => {
    const params = useParams();
    const messages: MessageProps[] = [{sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: false},
                                      {sender_name: "Some name", message: "Hello World!", timestamp: "17:40", is_current_user: true}]
    const virtualizer = useWindowVirtualizer({
        count: messages.length,
        estimateSize: () => 100
    })
    const virtualItems = virtualizer.getVirtualItems()
    return (
        <div className="chat">
            <div>
                Chetter info
            </div>
            {/*<div className="chat-window">*/}
            {/*    */}
            {/*</div>*/}
            <div className="chat-window">
                {virtualItems.map(({index, key}) => (
                        <div key={key} data-index={index}
                            className={"message-wrapper"}
                             ref={virtualizer.measureElement}>
                            <Message  {...messages[index]}/>
                        </div>
                    )
                )}
            </div>
            <Input/>
        </div>
    )
}

export default Chat;