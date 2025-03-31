import "@styles/ChatCard.css"

const ChatCard = () => {


    return (<>
        <div className="avatar-wrapper">
            <img src="/avatar3.png" alt="avatar"/>
        </div>
        <div className="info">
            <p><strong>User name</strong></p>
            <p className="last-message">Some last message...</p>
        </div>
    </>)
}

export default ChatCard;