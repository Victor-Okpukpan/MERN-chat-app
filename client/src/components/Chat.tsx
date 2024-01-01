import { useEffect, useState } from "react";
import FormElement from "./FormElement";

export default function Chat() {
  const [ws, setWs] = useState<null | WebSocket>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");
    setWs(socket);

  }, []);
  
  const handleMessage = (e: MessageEvent<unknown>) => {
    console.log("new message", e);
  };
  ws?.addEventListener("message", handleMessage);

  return (
    <div className="h-screen flex">
      <div className="w-1/3 bg-white p-2">Contacts</div>
      <div className="w-2/3 bg-gray-300 p-2 flex flex-col">
        <div className="flex-grow"></div>
        <form className="flex space-x-2">
          <FormElement
            isInput
            type="text"
            placeholder="Type your message here"
          />
          <button className="mb-2 p-2 rounded-sm text-white bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
