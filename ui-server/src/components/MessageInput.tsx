import "@styles/Input.css"

const MessageInput = () => {
    return(
        <div className="input-section">
            <input placeholder="Start chatting"/>
            <button type="submit">Send message</button>
        </div>
    )
}

export default MessageInput