import {useParams} from "react-router-dom";

const ChatWindow = () => {
    const params = useParams();
    return <>{params.id}</>
}

export default ChatWindow;