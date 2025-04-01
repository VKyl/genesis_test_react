import React, {useRef, useState} from "react";

export const useSelect = (defaultValue?: any) => {
    const parentRef = useRef<HTMLUListElement>(null);
    const [data_attribute, setData_attribute] = useState<any>(defaultValue);
    const handleListSelect = (e: React.MouseEvent<HTMLUListElement>) => {
        const prev = parentRef?.current?.querySelector('.selected')
        const target = e.target as HTMLLIElement;
        const li = target.closest("li")
        if (!li) return;
        if (prev) prev.className = ""
        li.className = "selected"
        setData_attribute(li.dataset.value)
    }
    return {parentRef: parentRef, handleListSelect: handleListSelect, data_attribute: data_attribute}
}