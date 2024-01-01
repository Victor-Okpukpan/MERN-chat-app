import { Dispatch, SetStateAction } from "react";

export type TUserContextType = {
    loggedInUser: string | null;
    setLoggedInUser: Dispatch<SetStateAction<string | null>>;
    id: string | null;
    setId: Dispatch<SetStateAction<number | null>>;
   };