/**
 * @generated SignedSource<<54e82229fe97db86dbaf3bcef84899e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type SignInInput = {
  password: string;
  email: string;
  clientMutationId?: string | null;
};
export type SignInMutation$variables = {
  input: SignInInput;
};
export type SignInMutationVariables = SignInMutation$variables;
export type SignInMutation$data = {
  readonly signIn: {
    readonly error: string | null;
    readonly accessToken: string;
  };
};
export type SignInMutationResponse = SignInMutation$data;
export type SignInMutation = {
  variables: SignInMutationVariables;
  response: SignInMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "input",
            variableName: "input",
          },
        ],
        concreteType: "SignInPayload",
        kind: "LinkedField",
        name: "signIn",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "error",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "accessToken",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "SignInMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "SignInMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "fa71e806ada5c782ba99a6b259c0e905",
      id: null,
      metadata: {},
      name: "SignInMutation",
      operationKind: "mutation",
      text: "mutation SignInMutation(\n  $input: SignInInput!\n) {\n  signIn(input: $input) {\n    error\n    accessToken\n  }\n}\n",
    },
  };
})();

(node as any).hash = "c26c55334c6e5b03b57239de37ca99e8";

export default node;
