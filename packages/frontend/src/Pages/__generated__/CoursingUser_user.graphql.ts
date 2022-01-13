/**
 * @generated SignedSource<<3c89d11c405e4f1c05931f1083a68a33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CoursingUser_user$data = {
  readonly id: string;
  readonly username: string;
  readonly coursed: ReadonlyArray<{
    readonly id: string;
    readonly technology_gid: string;
    readonly default_module_gid: string;
    readonly user_gid: string;
    readonly total: number;
  }>;
  readonly technologies: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly total: number;
    readonly order: number;
    readonly default_module_gid: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"Comments_data_user">;
  readonly " $fragmentType": "CoursingUser_user";
};
export type CoursingUser_user = CoursingUser_user$data;
export type CoursingUser_user$key = {
  readonly " $data"?: CoursingUser_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"CoursingUser_user">;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "default_module_gid",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "total",
      storageKey: null,
    };
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "CoursingUser_user",
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "username",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "Coursed",
        kind: "LinkedField",
        name: "coursed",
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "technology_gid",
            storageKey: null,
          },
          v1 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "user_gid",
            storageKey: null,
          },
          v2 /*: any*/,
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "Technology",
        kind: "LinkedField",
        name: "technologies",
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          v2 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "order",
            storageKey: null,
          },
          v1 /*: any*/,
        ],
        storageKey: null,
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "Comments_data_user",
      },
    ],
    type: "User",
    abstractKey: null,
  };
})();

(node as any).hash = "77556f3d2ead374d8238471975499f82";

export default node;
