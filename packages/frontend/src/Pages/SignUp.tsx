import { tokensAndData } from "../App";
import React, { FC, useState } from "react";
import { useMutation } from "react-relay/hooks";
import { logOut } from "../utils";
import { SignUpMutation } from "./__generated__/SignUpMutation.graphql";
import { graphql } from "babel-plugin-relay/macro";

export const SignUp: FC = () => {
  const [commit, isInFlight] = useMutation<SignUpMutation>(graphql`
    mutation SignUpMutation($input: SignUpInput!) {
      signUp(input: $input) {
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
      <div>Create Account</div>
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
                  if (response.signUp.error) {
                    if (response.signUp.error === "jwt expired") {
                      logOut();
                    }
                    return window.alert(response.signUp.error);
                  }
                  tokensAndData.accessToken = response.signUp.accessToken;
                  tokensAndData.refetchUser();
                },
              });
            }}
          >
            Create Account
          </button>
        </>
      )}
    </div>
  );
};
