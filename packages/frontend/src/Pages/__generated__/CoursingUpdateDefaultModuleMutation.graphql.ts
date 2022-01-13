/**
 * @generated SignedSource<<950ef1bc6170a3c07a5fbbf5d922199e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type UpdateDefaultModuleInput = {
  user_gid: string;
  module_gid: string;
  technology_gid: string;
  clientMutationId?: string | null;
};
export type CoursingUpdateDefaultModuleMutation$variables = {
  input: UpdateDefaultModuleInput;
};
export type CoursingUpdateDefaultModuleMutationVariables =
  CoursingUpdateDefaultModuleMutation$variables;
export type CoursingUpdateDefaultModuleMutation$data = {
  readonly updateDefaultModule: {
    readonly error: string;
    readonly coursedModule: {
      readonly id: string;
      readonly technology_gid: string;
      readonly default_module_gid: string;
      readonly user_gid: string;
      readonly total: number;
    };
    readonly accessToken: string;
  };
};
export type CoursingUpdateDefaultModuleMutationResponse =
  CoursingUpdateDefaultModuleMutation$data;
export type CoursingUpdateDefaultModuleMutation = {
  variables: CoursingUpdateDefaultModuleMutationVariables;
  response: CoursingUpdateDefaultModuleMutation$data;
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
        concreteType: "UpdateDefaultModulePayload",
        kind: "LinkedField",
        name: "updateDefaultModule",
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
            concreteType: "Coursed",
            kind: "LinkedField",
            name: "coursedModule",
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
                name: "technology_gid",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "default_module_gid",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "user_gid",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "total",
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
      name: "CoursingUpdateDefaultModuleMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "CoursingUpdateDefaultModuleMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "db01a3daf40150863e35e59a7ccd1911",
      id: null,
      metadata: {},
      name: "CoursingUpdateDefaultModuleMutation",
      operationKind: "mutation",
      text: "mutation CoursingUpdateDefaultModuleMutation(\n  $input: UpdateDefaultModuleInput!\n) {\n  updateDefaultModule(input: $input) {\n    error\n    coursedModule {\n      id\n      technology_gid\n      default_module_gid\n      user_gid\n      total\n    }\n    accessToken\n  }\n}\n",
    },
  };
})();

(node as any).hash = "19ab90f235e97b43c88fa2edf3381f68";

export default node;
