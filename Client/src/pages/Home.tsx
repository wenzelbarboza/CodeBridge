import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

const Home = () => {
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label>Paste invitation ROOM ID</label>
                  <Input id="name" placeholder="ROOM ID" />
                  <Input id="name" placeholder="USER NAME" />
                </div>
              </div>
              {/* <div className="flex  flex-col"> */}
              <Button className="mt-5 w-full">
                <Link to={"/editor/5"}>Join</Link>
              </Button>
              {/* </div> */}
            </form>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
          <CardFooter>
            <p className="text-sm">
              If you don't have invite the create{" "}
              <Link
                to={""}
                className="text-primary underline hover:text-primary/90"
              >
                new room
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
