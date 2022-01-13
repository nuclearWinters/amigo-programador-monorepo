/**
 * @generated SignedSource<<a9e8cff5dec6cf30d3239ec6fa46bc3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type UpdateDefaultTechnologyInput = {
  user_gid: string;
  technology_gid: string;
  clientMutationId?: string | null;
};
export type TechnologiesUpdateDefaultTechnologyMutation$variables = {
  input: UpdateDefaultTechnologyInput;
};
export type TechnologiesUpdateDefaultTechnologyMutationVariables =
  TechnologiesUpdateDefaultTechnologyMutation$variables;
export type TechnologiesUpdateDefaultTechnologyMutation$data = {
  readonly updateDefaultTechnology: {
    readonly error: string;
    readonly user: {
      readonly id: string;
      readonly default_technology_gid: string;
    };
    readonly accessToken: string;
  };
};
export type TechnologiesUpdateDefaultTechnologyMutationResponse =
  TechnologiesUpdateDefaultTechnologyMutation$data;
export type TechnologiesUpdateDefaultTechnologyMutation = {
  variables: TechnologiesUpdateDefaultTechnologyMutationVariables;
  response: TechnologiesUpdateDefaultTechnologyMutation$data;
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
        concreteType: "UpdateDefaultTechnologyPayload",
        kind: "LinkedField",
        name: "updateDefaultTechnology",
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
            concreteType: "User",
            kind: "LinkedField",
            name: "user",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "id",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "default_technology_gid",
                storageKey: null,
              },
            ],
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
      name: "TechnologiesUpdateDefaultTechnologyMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "TechnologiesUpdateDefaultTechnologyMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "0c4db40a91882a03fc04c2f3e4da2c80",
      id: null,
      metadata: {},
      name: "TechnologiesUpdateDefaultTechnologyMutation",
      operationKind: "mutation",
      text: "mutation TechnologiesUpdateDefaultTechnologyMutation(\n  $input: UpdateDefaultTechnologyInput!\n) {\n  updateDefaultTechnology(input: $input) {\n    error\n    user {\n      id\n      default_technology_gid\n    }\n    accessToken\n  }\n}\n",
    },
  };
})();

(node as any).hash = "bcd875bcfda7bca24a01c367831dba7d";

export default node;
