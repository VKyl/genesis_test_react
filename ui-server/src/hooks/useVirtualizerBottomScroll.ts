import {useEffect, useRef} from "react";
import {useWindowVirtualizer} from "@tanstack/react-virtual";
import {ChatResponseDTO} from "../api/chats.ts";


export const useVirtualizerBottomScroll = (data: ChatResponseDTO) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const virtualizer = useWindowVirtualizer({
        count: data?.messages.length,
        estimateSize: () => 100,
    })
    const virtualItems = virtualizer.getVirtualItems()
    useEffect(() => {
            requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView();
            });
    }, [virtualizer.getVirtualItems()])
    return {virtualizer: virtualizer, virtualItems: virtualItems, bottomRef: bottomRef};
}