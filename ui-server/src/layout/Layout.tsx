import {Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "@pages/WelcomePage";
import ChatWindow from "@pages/Chat";
import ChatsSidebar from "./ChatsSidebar.tsx";
import React from "react";
import '@styles/Layout.css'
const Layout = () => {
    return <div className="main-layout">
                <main>
                    <Routes>
                        <Route path="/chats" Component={WelcomePage}/>
                        <Route path="/chats/:id" Component={ChatWindow}/>
                        <Route path="*" element={<Navigate to="/chats" replace/>}/>
                    </Routes>
                </main>
                <ChatsSidebar/>
            </div>
}

export default Layout