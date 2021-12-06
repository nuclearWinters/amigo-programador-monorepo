import { tokensAndData } from "./App";

export const logOut = () => {
  tokensAndData.accessToken = "";
  tokensAndData.refetchUser();
};
