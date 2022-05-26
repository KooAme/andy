import { userInfo } from "./userType";
import { Dispatch, SetStateAction } from "react";
interface DrawerToBottom {
  navigation: any;
  isLogined: boolean;
  userInfo: userInfo | undefined;
  setIsLogined: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<userInfo | undefined>>;
}

export type { DrawerToBottom };
