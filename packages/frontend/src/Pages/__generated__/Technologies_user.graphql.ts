/**
 * @generated SignedSource<<d50c30b695dcfbff1747bb7ac9f2e11a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Technologies_user$data = {
  readonly id: string;
  readonly technologies: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly total: number;
    readonly order: number;
    readonly default_module_gid: string;
  }>;
  readonly coursed: ReadonlyArray<{
    readonly technology_gid: string;
    readonly total: number;
    readonly default_module_gid: string;
  }>;
  readonly " $fragmentType": "Technologies_user";
};
export type Technologies_user = Technologies_user$data;
export type Technologies_user$key = {
  readonly " $data"?: Technologies_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Technologies_user">;
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
      name: "total",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "default_module_gid",
      storageKey: null,
    };
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "Technologies_user",
    selections: [
      v0 /*: any*/,
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
          v1 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "order",
            storageKey: null,
          },
          v2 /*: any*/,
        ],
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
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "technology_gid",
            storageKey: null,
          },
          v1 /*: any*/,
          v2 /*: any*/,
        ],
        storageKey: null,
      },
    ],
    type: "User",
    abstractKey: null,
  };
})();

(node as any).hash = "fb4345d9d10d481bc422805d317e9e5c";

export default node;
