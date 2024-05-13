import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = user => {
        user.role==="teller" ? navigate('/transactions') : navigate('/manage');
        setAuthUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        navigate("/");
        setAuthUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
