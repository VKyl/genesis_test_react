import {useEffect, useRef} from "react";
import {useWindowVirtualizer} from "@tanstack/react-virtual";


export const useVirtualizerBottomScroll = (messages: any[]) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const virtualizer = useWindowVirtualizer({
        count: messages.length,
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