export type Message =
  | {
      type: "USER_UPDATE";
      updateType: "DISCONNECTED" | "CONNECTED";
      updatedUser: string;
      names: string[];
    }
  | {
      type: "CODE_UPDATE";
      updatingUser: string;
      code: string;
    };
