import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "@pages/WelcomePage";
import ChatWindow from "@pages/ChatWindow";
import ChatsSidebar from "./ChatsSidebar";
import React from "react";
import '@styles/Layout.css'
const Layout = () => {

    return <div className="main-layout">
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/chats" Component={WelcomePage}/>
                    <Route path="/chats/:id" Component={ChatWindow}/>
                    <Route path="*" element={<Navigate to="/chats" replace/>}/>
                </Routes>
            </main>
        </BrowserRouter>
        <ChatsSidebar/>
    </div>
}

export default Layout