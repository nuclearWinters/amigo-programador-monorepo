/**
 * @generated SignedSource<<30273eb938d7978ffe8e0f9123215d35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Replies_query$data = {
  readonly id: string;
  readonly replies: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"Reply_replies">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "Replies_query";
};
export type Replies_query = Replies_query$data;
export type Replies_query$key = {
  readonly " $data"?: Replies_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"Replies_query">;
};

const node: ReaderFragment = (function () {
  var v0 = ["replies"],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    };
  return {
    argumentDefinitions: [
      {
        defaultValue: 0,
        kind: "LocalArgument",
        name: "count",
      },
      {
        defaultValue: "",
        kind: "LocalArgument",
        name: "cursor",
      },
    ],
    kind: "Fragment",
    metadata: {
      connection: [
        {
          count: "count",
          cursor: "cursor",
          direction: "forward",
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: "count",
            cursor: "cursor",
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: ["node"],
        operation: require("./RepliesPaginationQuery.graphql"),
        identifierField: "id",
      },
    },
    name: "Replies_query",
    selections: [
      v1 /*: any*/,
      {
        alias: "replies",
        args: null,
        concreteType: "ReplyConnection",
        kind: "LinkedField",
        name: "__Replies_query_replies_connection",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "ReplyEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Reply",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: [
                  v1 /*: any*/,
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "Reply_replies",
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "__typename",
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "cursor",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: "PageInfo",
            kind: "LinkedField",
            name: "pageInfo",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "endCursor",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "hasNextPage",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "Comment",
    abstractKey: null,
  };
})();

(node as any).hash = "1220a1b291ee535655796e1ba87161a4";

export default node;
