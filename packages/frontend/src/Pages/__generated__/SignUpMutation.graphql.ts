/**
 * @generated SignedSource<<ce9f484343942924faedd90aba9f9927>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type SignUpInput = {
  password: string;
  email: string;
  clientMutationId?: string | null;
};
export type SignUpMutation$variables = {
  input: SignUpInput;
};
export type SignUpMutationVariables = SignUpMutation$variables;
export type SignUpMutation$data = {
  readonly signUp: {
    readonly error: string;
    readonly accessToken: string;
  };
};
export type SignUpMutationResponse = SignUpMutation$data;
export type SignUpMutation = {
  variables: SignUpMutationVariables;
  response: SignUpMutation$data;
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
        concreteType: "SignUpPayload",
        kind: "LinkedField",
        name: "signUp",
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
      name: "SignUpMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "SignUpMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "c038cae93e0906e9f30c33caca7fee1c",
      id: null,
      metadata: {},
      name: "SignUpMutation",
      operationKind: "mutation",
      text: "mutation SignUpMutation(\n  $input: SignUpInput!\n) {\n  signUp(input: $input) {\n    error\n    accessToken\n  }\n}\n",
    },
  };
})();

(node as any).hash = "0dea7eab86f740ea1a4ae131f0b770fc";

export default node;
