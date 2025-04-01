import {Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "@pages/WelcomePage";
import ChatWindow from "@pages/Chat";
import ChatsSidebar from "./ChatsSidebar.tsx";
import React, {Suspense, useContext} from "react";
import '@styles/Layout.css'
import {AuthContext} from "../components/AuthContextProvider.tsx";

const LoggedLayout = () => <div className="main-layout">
    <main>
        <Suspense fallback={null}>
            <Routes>
                <Route path="/chats" Component={WelcomePage}/>
                <Route path="/chats/:id" Component={ChatWindow}/>
                <Route path="*" element={<Navigate to="/chats" replace/>}/>
            </Routes>
        </Suspense>
    </main>
    <ChatsSidebar/>
</div>

const UnSignedLayout = () => <Routes>
                                <Route path="*" element={<Navigate to="/" replace/>}/>
                                <Route path="/" element={
                                    <h1 className="unsigned-layout">Wait until logged in...</h1>}/>
                            </Routes>

const Layout = () => {
    const userContext = useContext(AuthContext);
    return userContext?.u_id ? <LoggedLayout/> : <UnSignedLayout/>
    // return true ? <LoggedLayout/> : <UnSignedLayout/>
}

export default Layout