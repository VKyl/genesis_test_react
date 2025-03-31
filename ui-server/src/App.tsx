import './styles/App.css'
import React, {useContext} from "react";
import Layout from "@layout/Layout";
import {BrowserRouter} from "react-router-dom";

interface UserSession {
    name: string,
    u_id: string
}

const testUserSession: UserSession = {
    name: "test",
    u_id: "test",
}

export const UserContext = React.createContext(testUserSession as UserSession);

function App() {
    const user = useContext(UserContext);
    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App
