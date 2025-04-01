import "@styles/Input.css"
import {useRef} from "react";

type MessageInputProps = {
    receiverId: string
}


const MessageInput = ({receiverId}: MessageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return(
        <div className="input-section">
            <input ref={inputRef} placeholder="Start chatting"/>
            <button onClick={() => handleSending()} type="submit">Send message</button>
        </div>
    )
}

const handleSending = () => {

}

export default MessageInput