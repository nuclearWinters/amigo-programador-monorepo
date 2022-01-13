/**
 * @generated SignedSource<<c9b2ac941eec03f4f0828032d970f7c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Comments_module$data = {
  readonly comments: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"Comment_comments">;
      } | null;
    } | null> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "Comments_module";
};
export type Comments_module = Comments_module$data;
export type Comments_module$key = {
  readonly " $data"?: Comments_module$data;
  readonly " $fragmentSpreads": FragmentRefs<"Comments_module">;
};

const node: ReaderFragment = (function () {
  var v0 = ["comments"],
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
        defaultValue: 5,
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
        operation: require("./CommentsPaginationModule.graphql"),
        identifierField: "id",
      },
    },
    name: "Comments_module",
    selections: [
      {
        alias: "comments",
        args: null,
        concreteType: "CommentConnection",
        kind: "LinkedField",
        name: "__Comments_query_comments_connection",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "CommentEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Comment",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: [
                  v1 /*: any*/,
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "Comment_comments",
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
      v1 /*: any*/,
    ],
    type: "Module",
    abstractKey: null,
  };
})();

(node as any).hash = "f9bd98b2f8b28ea417a0ec4f6d65ba23";

export default node;
