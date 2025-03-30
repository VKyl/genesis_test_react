import "../styles/Message.css"

export interface MessageProps {
    sender_name: string,
    message: string,
    timestamp: string,
    is_current_user?: boolean,
}

const Message = ({is_current_user = false, ...props}: MessageProps) => {
    return (
        <div className={"message" + (is_current_user ? " user-message" : "")}>
            <div className="header">
                <span>{props.sender_name}</span> <span className="date">{props.timestamp}</span>
            </div>
            <div className="content">
                {props.message}
            </div>
        </div>
    )
}

export default Message;