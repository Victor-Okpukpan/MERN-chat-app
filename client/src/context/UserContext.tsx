import { createContext, useState, ReactNode, useEffect } from "react";
import { TUserContextType } from "../global";
import axios from "axios";

export const UserContext = createContext<TUserContextType | undefined>(undefined);

interface IUserContextProviderProps {
 children: ReactNode;
}

// Authentication context provider
export function UserContextProvider({ children }: IUserContextProviderProps) {
 const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
 const [id, setId] = useState<string | null>(null);

 useEffect(() => {
    axios.get("/profile").then(response => {
        setLoggedInUser(response.data.username);
        setId(response.data.userId);
    })
 }, [])

 console.log(loggedInUser, id);

 return (
   <UserContext.Provider value={{ loggedInUser, setLoggedInUser, id, setId } as TUserContextType}>
     {children}
   </UserContext.Provider>
 );
}
