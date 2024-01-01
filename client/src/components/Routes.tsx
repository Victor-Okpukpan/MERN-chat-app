import { useContext } from "react";
import Authentication from "../Authentication";
import { UserContext } from "../context/UserContext";
import { TUserContextType } from "../global";
import Chat from "./Chat";

export default function Routes() {
  const { loggedInUser } = useContext(UserContext) as TUserContextType;
  return <>{!loggedInUser ? <Authentication /> : <Chat />}</>;
}
