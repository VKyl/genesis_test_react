import React, {useRef} from "react";

export const useSelect = () => {
    const parentRef = useRef<HTMLUListElement>(null);
    const handleListSelect = (e: React.MouseEvent<HTMLUListElement>) => {
        const prev = parentRef?.current?.querySelector('.selected')
        const target = e.target as HTMLLIElement;
        const li = target.closest("li")
        if (!li) return;
        if (prev) prev.className = ""
        li.className = "selected"
    }
    return {parentRef: parentRef, handleListSelect: handleListSelect}
}