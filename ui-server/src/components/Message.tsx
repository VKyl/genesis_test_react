import "../styles/Message.css"
import {useContext} from "react";
import {AuthContext} from "./AuthContextProvider.tsx";

export interface MessageProps {
    sender_name: string,
    message: string,
    timestamp: string,
}

const Message = ({...props}: MessageProps) => {
    const user = useContext(AuthContext);
    const date = new Date(props.timestamp);
    return (
        <div className={"message" + (props.sender_name === user?.name ? " user-message" : "")}>
            <div className="header">
                <span>{props.sender_name}</span> <span className="date">{getTime(date)}</span>
            </div>
            <div className="content">
                {props.message}
            </div>
        </div>
    )
}

const getTime = (date: Date) => {
    return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0")
}

export default Message;