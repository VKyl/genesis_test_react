import "@styles/Input.css"
import {useContext, useRef} from "react";
import {AuthContext} from "./AuthContextProvider.tsx";
import {useMutation} from "@tanstack/react-query";
import {sendMessage} from "../api/messages.ts";

type MessageInputProps = {
    receiver_id: string
}


const MessageInput = ({receiver_id}: MessageInputProps) => {
    const user = useContext(AuthContext)
    const inputRef = useRef<HTMLInputElement>(null)
    const {mutateAsync: sendMessageAction} = useMutation({
        mutationFn: sendMessage,
    })
    return(
        <div className="input-section">
            <input ref={inputRef} placeholder="Start chatting"/>
            <button onClick={async () => {
              try {
                  await sendMessageAction({sender_id: user?.u_id as string,
                                              message: inputRef.current?.value as string,
                                              receiver_id})
              }catch (e) {
                  console.log(e)
              }
            }}
                    type="submit">
                Send message
            </button>
        </div>
    )
}


export default MessageInput