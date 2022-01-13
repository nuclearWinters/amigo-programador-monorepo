/**
 * @generated SignedSource<<e330180e1fb99d58c18862536c7e6ebf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CoursingModule_user$data = {
  readonly module: {
    readonly id: string;
    readonly title: string;
    readonly date: Int;
    readonly duration: string;
    readonly likes: ReadonlyArray<{
      readonly id: string;
      readonly comment_gid: string;
      readonly user_gid: string;
      readonly status: boolean;
      readonly created_at: Int;
      readonly updated_at: Int;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"Comments_module">;
  };
  readonly id: string;
  readonly " $fragmentType": "CoursingModule_user";
};
export type CoursingModule_user = CoursingModule_user$data;
export type CoursingModule_user$key = {
  readonly " $data"?: CoursingModule_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"CoursingModule_user">;
};

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "id",
    storageKey: null,
  };
  return {
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "module_gid",
      },
    ],
    kind: "Fragment",
    metadata: {
      refetch: {
        connection: null,
        fragmentPathInResult: ["node"],
        operation: require("./CoursingModuleRefetchUser.graphql"),
        identifierField: "id",
      },
    },
    name: "CoursingModule_user",
    selections: [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "module_gid",
            variableName: "module_gid",
          },
        ],
        concreteType: "Module",
        kind: "LinkedField",
        name: "module",
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "date",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "duration",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: "Like",
            kind: "LinkedField",
            name: "likes",
            plural: true,
            selections: [
              v0 /*: any*/,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "comment_gid",
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
                name: "status",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "created_at",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "updated_at",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            args: null,
            kind: "FragmentSpread",
            name: "Comments_module",
          },
        ],
        storageKey: null,
      },
      v0 /*: any*/,
    ],
    type: "User",
    abstractKey: null,
  };
})();

(node as any).hash = "3326d72c8baabce32988b2f09cdfe051";

export default node;
