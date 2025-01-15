import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast, useToast } from "../hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    roomID: "",
    userName: "",
  });

  const [formError, setFormError] = useState("");

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formError && formData.roomID && formData.userName) {
      setFormError("");
    }

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEnterRoom = async () => {
    if (!formData.roomID || !formData.userName) {
      setFormError("All fields are required!!");
      return;
    }
    console.log(formData);

    toast({
      description: "✅ Room created successfully",
    });

    navigate(`editor/${formData.roomID}#${formData.userName}`);
  };

  const handleCreateRoom = () => {
    setFormData((prev) => ({
      ...prev,
      roomID: uuid(),
    }));
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("enter pressed: ", event.code);
    if (event.code == "Enter") handleEnterRoom();
  };

  return (
    <>
      <div className="grid items-center justify-center min-h-svh">
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex justify-center">
              <img
                className="h-10 w-auto"
                src="https://nnbwwoyabieqwquwxlts.supabase.co/storage/v1/object/public/CodeBridge-assets/CodeBridge-logo-1.png"
                alt=""
              />
            </div>
            {/* <CardDescription>Paste intivation ROOM ID</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label>Paste invitation ROOM ID</label>
                <Input
                  name="roomID"
                  value={formData.roomID}
                  onChange={handleFormChange}
                  placeholder="ROOM ID"
                  onKeyUp={handleEnterKey}
                />
                <Input
                  name="userName"
                  value={formData.userName}
                  onChange={handleFormChange}
                  placeholder="USER NAME"
                  onKeyUp={handleEnterKey}
                />
              </div>
            </div>
            {/* <div className="flex  flex-col"> */}
            <Button onClick={handleEnterRoom} className="mt-5 w-full">
              Join
            </Button>
            {formError && (
              <span className="text-sm text-red-500">{formError}</span>
            )}
            {/* </div> */}
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
          <CardFooter>
            <p className="text-sm">
              If you don't have invite the create{" "}
              <span
                onClick={handleCreateRoom}
                className="text-primary underline hover:text-primary/90 cursor-pointer"
              >
                new room
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
