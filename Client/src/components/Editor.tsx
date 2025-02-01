import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../hooks/use-toast";
import { Message } from "../lib/types";

type Props = {
  id: string;
  name: string;
  users: Array<string>;
  setUser: (useers: Array<string>) => void;
};

const languageExtensions = {
  js: javascript(),
};

const Editor = ({ name, id, setUser, users }: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [code, setCode] = useState("");

  const WS_CONNECT_URL = `ws://localhost:3000`;

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket<Message>(WS_CONNECT_URL, {
      queryParams: {
        name,
        id,
      },
    });

  if (lastJsonMessage) console.log(lastJsonMessage);

  let wsCode: string = "";
  if (lastJsonMessage && lastJsonMessage.type == "CODE_UPDATE") {
    wsCode = lastJsonMessage.code;
  }

  const codeUpdate =
    lastJsonMessage && lastJsonMessage.type == "CODE_UPDATE"
      ? lastJsonMessage.code
      : code;

  useEffect(() => {
    setCode(wsCode);
  }, [codeUpdate]);

  console.log("json message:", lastJsonMessage);

  const checkUserlist =
    lastJsonMessage && lastJsonMessage.type == "USER_UPDATE"
      ? lastJsonMessage.names
      : users;

  useEffect(() => {
    setUser(checkUserlist);
  }, [checkUserlist, setUser]);

  const onChangeHandler = (value: string) => {
    console.log("updated value: ", value);
    setCode(value);
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
  }, [readyState, navigate, toast]);

  return (
    <CodeMirror
      onChange={onChangeHandler}
      value={code}
      extensions={[languageExtensions.js]}
      theme="dark"
      className=" flex-1 text-lg"
      height="100%"
    />
  );
};

export default Editor;
