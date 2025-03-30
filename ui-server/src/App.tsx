import './styles/App.css'
import React from "react";
import Layout from "@layout/Layout";

interface UserSession {
    name: string,
    u_id: string
}

function App() {
    let user: UserSession = {} as UserSession;
    const UserContext = React.createContext(user);

    return (
        <UserContext.Provider value={user}>
            <Layout/>
        </UserContext.Provider>
    )
}

export default App
