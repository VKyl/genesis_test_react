import {useParams} from "react-router-dom";
import '@styles/ChatWindow.css'

const ChatWindow = () => {
    const params = useParams();
    return <div className="chat">
        <div className="chat-window">
            <div className="message user-message">
                <div className="header">
                    <span>User name</span> <span className="date">14:20</span>
                </div>
                <div className="content">
                    Hello world!
                </div>
            </div>

            <div className="message">
                <div className="header">
                    <span>User name</span> <span className="date">14:20</span>
                </div>
                <div className="content">
                    Hello world!
                </div>
            </div>
        </div>
        <div className="input-section">
            <input placeholder="Start chatting"/>
            <button type="submit">Send message</button>
        </div>
    </div>
}

export default ChatWindow;