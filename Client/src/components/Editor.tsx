import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../hooks/use-toast";

const languageExtensions = {
  js: javascript(),
};

const Editor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const WS_CONNECT_URL = `ws://localhost:3000`;

  const { sendJsonMessage, readyState } = useWebSocket(WS_CONNECT_URL);

  const onChangeHandler = (value: string) => {
    sendJsonMessage(value);
  };

  //if ws session DISCONNECTED navigate to home
  useEffect(() => {
    if (readyState == ReadyState.CLOSED) {
      toast({
        description: "session DISCONNECTED",
      });
      navigate("/");
    }
  }, [readyState]);

  return (
    <CodeMirror
      onChange={onChangeHandler}
      extensions={[languageExtensions.js]}
      theme="dark"
      className=" flex-1 text-lg"
      height="100%"
    />
  );
};

export default Editor;
