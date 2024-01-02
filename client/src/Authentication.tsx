import { FormEvent, useContext, useState } from "react";
import FormElement from "./components/FormElement";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { TUserContextType } from "./global";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("Register");

  const { setLoggedInUser, setId } = useContext(
    UserContext
  ) as TUserContextType;

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = page === "Register" ? "/register" : "/login";

    const { data } = await axios.post(url, {
      username,
      password,
    });

    setLoggedInUser(username);
    setId(data.id);
  };

  //login/signup page
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <form onSubmit={onFormSubmit} className="w-64">
        <FormElement
          isInput={true}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <FormElement
          isInput={true}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />

        <button
          type="submit"
          className="p-2 block w-full bg-blue-500 text-white font-medium rounded-sm"
        >
          {page === "Register" ? "Register" : "Login"}
        </button>

        {page === "Register" ? (
          <div className="text-center mt-2">
            Already a member?{" "}
            <button onClick={() => setPage("Login")}>Login</button>
          </div>
        ) : (
          <div className="text-center mt-2">
            Don&apos;t have an account?{" "}
            <button onClick={() => setPage("Register")}>Register</button>
          </div>
        )}
      </form>
    </div>
  );
}
