import { tokensAndData } from "../App";
import React, { FC, useState } from "react";
import { useMutation } from "react-relay/hooks";
import { logOut } from "../utils";
import { SignInMutation } from "./__generated__/SignInMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";

export const SignIn: FC = () => {
  const [commit, isInFlight] = useMutation<SignInMutation>(graphql`
    mutation SignInMutation($input: SignInInput!) {
      signIn(input: $input) {
        error
        accessToken
      }
    }
  `);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <div>Log In</div>
      <div>Email</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />
      <div>Password</div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      {isInFlight ? (
        <div>Loading...</div>
      ) : (
        <>
          <button
            onClick={() => {
              commit({
                variables: {
                  input: {
                    email,
                    password,
                  },
                },
                onCompleted: (response) => {
                  if (response.signIn.error) {
                    if (response.signIn.error === "jwt expired") {
                      logOut();
                    }
                    return window.alert(response.signIn.error);
                  }
                  tokensAndData.accessToken = response.signIn.accessToken;
                  tokensAndData.refetchUser();
                },
              });
            }}
          >
            Log In
          </button>
        </>
      )}
    </div>
  );
};
