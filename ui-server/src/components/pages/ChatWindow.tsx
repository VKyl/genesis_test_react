import {useParams} from "react-router-dom";
import '@styles/ChatWindow.css'

const ChatWindow = () => {
    const params = useParams();
    return <div className="chat">
        <div className="chat-window">
            <div className="message user-message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
            <div className="message">
                Hello world!
            </div>
        </div>
        <div className="input-section">
            <input placeholder="Start chatting"/>
        </div>
    </div>
}

export default ChatWindow;