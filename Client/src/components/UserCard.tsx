import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = { socketId: number; userName: string };

const UserCard = ({ socketId, userName }: Props) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {/* TODO
            corp the name, first 2 letters for the fallback
        */}
        <Avatar>
          <AvatarFallback className="dark:text-white bg-primary">
            CN
          </AvatarFallback>
        </Avatar>
        <span className="dark:text-white">{userName}</span>
      </div>
    </>
  );
};

export default UserCard;
