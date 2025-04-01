import {ChangeEvent, Dispatch} from "react";


const SearchFilter = ({filter, setFilter}: {filter: string, setFilter: Dispatch<any> }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
    return <div className="search-input">
        <input onChange={(e) => handleChange(e)} value={filter} placeholder="Search..."/>
    </div>
}

export default SearchFilter;