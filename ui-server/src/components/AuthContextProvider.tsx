import {createContext, PropsWithChildren} from "react";
import {User} from "../utils/constants.ts";

export type AuthProviderProps = {user?: User | null} & PropsWithChildren;

export const AuthContext = createContext<User | null>(null)

export const AuthProvider = ({user, children }: AuthProviderProps) => {
    return <AuthContext.Provider value={user || {}}>{children}</AuthContext.Provider>;
}