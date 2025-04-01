import "@styles/Input.css";
import {useContext, useEffect, useRef} from "react";
import { AuthContext } from "./AuthContextProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api/messages.ts";

type MessageInputProps = {
  receiver_id: string;
};

const MessageInput = ({ receiver_id }: MessageInputProps) => {
    const user = useContext(AuthContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: sendMessageAction } = useMutation({
        mutationFn: sendMessage,
    });

    useEffect(() => {
        if(inputRef.current)
            inputRef.current.value = "";
    }, [receiver_id]);

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        try {
            await sendMessageAction({
                sender_id: user?.u_id as string,
                message: inputRef.current?.value as string,
                receiver_id,
            }).then(() => {
                if (inputRef.current)
                    inputRef.current.value = "";
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className="input-section">
              <input ref={inputRef} placeholder="Start chatting" />
              <button onClick={(e) => handleSendMessage(e)} type="submit">
                Send message
              </button>
        </form>
    );
};

export default MessageInput;
