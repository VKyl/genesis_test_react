import './styles/App.css'
import React, {useContext} from "react";
import Layout from "@layout/Layout";

interface UserSession {
    name: string,
    u_id: string
}
export const UserContext = React.createContext({} as UserSession);

function App() {
    const user = useContext(UserContext);
    return (
        <UserContext.Provider value={user}>
            <Layout/>
        </UserContext.Provider>
    )
}

export default App
