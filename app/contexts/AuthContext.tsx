"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { refresh } from "../actions/auth";
import { setAccessTokenStorage } from "../actions/apiClient";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    setAccessToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, _setAccessToken] = useState<string | null>(null);

    const setAccessToken = (token: string | null) => {
        _setAccessToken(token);
        setAccessTokenStorage(token);
    }
    const getAccessToken = async () => {
        try {
            // check if refresh token cookie is active
            const res = await refresh();
            if(res.status >= 300) {
                setAccessToken(null);
                console.log("no refresh cookie");
                return;
            }
            const data = res.data;
            console.log("refresh cookie found");
            setAccessToken(data.accessToken);
        }
        catch {
            setAccessToken(null);
        }
    }
    useEffect(() => {
        getAccessToken();
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
