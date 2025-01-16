import { useParams } from "react-router";
import { Button } from "../components/ui/button";
import UserCard from "../components/UserCard";
import { useState } from "react";
import Editor from "../components/Editor";

const EditorPage = () => {
  const { id } = useParams();
  console.log("params is: ", id);

  // const [users, setUsers] = useState([
  const [users] = useState([
    {
      socketId: 1,
      userName: "hello",
    },
    {
      socketId: 2,
      userName: "hello2",
    },
    {
      socketId: 3,
      userName: "hello3",
    },
    {
      socketId: 4,
      userName: "hello4",
    },
  ]);

  return (
    <>
      <div className="flex w-full h-screen">
        <aside className=" w-56 p-2 flex flex-col max-h-screen">
          <div className="flex justify-center items-center">
            <img
              className="h-7 w-auto mt-5"
              src="https://nnbwwoyabieqwquwxlts.supabase.co/storage/v1/object/public/CodeBridge-assets/CodeBridge-logo-1.png"
              alt=""
            />
          </div>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700 "></hr>
          <div className=" flex-1 overflow-y-auto custom-scrollbar p-1 gap-4 flex flex-col">
            {users.map(({ socketId, userName }, index) => (
              <UserCard socketId={socketId} userName={userName} key={index} />
            ))}
            {/* <div className="h-7 bg-red-500 my-2">constent</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div>
            <div className="h-7 bg-red-500 my-2">content</div> */}
          </div>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-col gap-2">
            <Button>Copy ID</Button>
            <Button variant={"destructive"}>Leave</Button>
          </div>
        </aside>

        <main className="bg-blue-600 flex-1 flex max-h-screen ">
          <Editor />
        </main>
      </div>
    </>
  );
};

export default EditorPage;
