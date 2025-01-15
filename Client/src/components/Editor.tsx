import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const languageExtensions = {
  js: javascript(),
};

const Editor = () => {
  return (
    <CodeMirror
      extensions={[languageExtensions.js]}
      theme="dark"
      className=" flex-1"
      height="100%"
    />
  );
};

export default Editor;
