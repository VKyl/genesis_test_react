import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "@pages/WelcomePage";
import ChatWindow from "@pages/ChatWindow";
import NotFound from "@pages/NotFound";
import ChatsSidebar from "./ChatsSidebar";
import React from "react";
import '@styles/Layout.css'
const Layout = () => {

    return <div className="row">
        <BrowserRouter>
            <Routes>
                <Route path="/chats" Component={WelcomePage}/>
                <Route path="/chats/:id" Component={ChatWindow}/>
                <Route path="*" element={<Navigate to="/chats" replace/>}/>
            </Routes>
        </BrowserRouter>
        <ChatsSidebar/>
    </div>
}

export default Layout