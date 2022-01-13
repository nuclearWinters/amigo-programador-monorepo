/**
 * @generated SignedSource<<e6d8a10eea190a52d1de2f0d2264a8ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type LogOutInput = {
  clientMutationId?: string | null;
};
export type AppLogOutMutation$variables = {
  input: LogOutInput;
};
export type AppLogOutMutationVariables = AppLogOutMutation$variables;
export type AppLogOutMutation$data = {
  readonly logOut: {
    readonly error: string;
  };
};
export type AppLogOutMutationResponse = AppLogOutMutation$data;
export type AppLogOutMutation = {
  variables: AppLogOutMutationVariables;
  response: AppLogOutMutation$data;
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
        concreteType: "LogOutPayload",
        kind: "LinkedField",
        name: "logOut",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "error",
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
      name: "AppLogOutMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "AppLogOutMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "f33482a954e8a1f39e3801f4ba38ac50",
      id: null,
      metadata: {},
      name: "AppLogOutMutation",
      operationKind: "mutation",
      text: "mutation AppLogOutMutation(\n  $input: LogOutInput!\n) {\n  logOut(input: $input) {\n    error\n  }\n}\n",
    },
  };
})();

(node as any).hash = "1f0874b48bf9762983d71148b66c3308";

export default node;
