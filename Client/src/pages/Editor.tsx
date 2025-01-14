import { useParams } from "react-router";

const Editor = () => {
  const { id } = useParams();
  console.log("params is: ", id);
  return (
    <>
      <div>editor</div>
    </>
  );
};

export default Editor;
