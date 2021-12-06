import { tokensAndData } from "./App";

export const logOut = () => {
  tokensAndData.accessToken = undefined;
  tokensAndData.refetchUser();
};
