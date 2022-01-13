/**
 * @generated SignedSource<<b3abe2da66c4b182f3ab1356e9003432>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommentsPaginationModule$variables = {
  count?: number | null;
  cursor?: string | null;
  id: string;
};
export type CommentsPaginationModuleVariables =
  CommentsPaginationModule$variables;
export type CommentsPaginationModule$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"Comments_module">;
  } | null;
};
export type CommentsPaginationModuleResponse = CommentsPaginationModule$data;
export type CommentsPaginationModule = {
  variables: CommentsPaginationModuleVariables;
  response: CommentsPaginationModule$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
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
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v4 = [
      {
        kind: "Variable",
        name: "after",
        variableName: "cursor",
      },
      {
        kind: "Variable",
        name: "first",
        variableName: "count",
      },
    ],
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "likes",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "text",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "user_gid",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "user_username",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "created_at",
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "updated_at",
      storageKey: null,
    },
    v11 = [
      {
        kind: "Literal",
        name: "after",
        value: "",
      },
      {
        kind: "Literal",
        name: "first",
        value: 0,
      },
    ],
    v12 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cursor",
      storageKey: null,
    },
    v13 = {
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
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "CommentsPaginationModule",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              args: [
                {
                  kind: "Variable",
                  name: "count",
                  variableName: "count",
                },
                {
                  kind: "Variable",
                  name: "cursor",
                  variableName: "cursor",
                },
              ],
              kind: "FragmentSpread",
              name: "Comments_module",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "CommentsPaginationModule",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              kind: "InlineFragment",
              selections: [
                {
                  alias: null,
                  args: v4 /*: any*/,
                  concreteType: "CommentConnection",
                  kind: "LinkedField",
                  name: "comments",
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
                            v3 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "module_gid",
                              storageKey: null,
                            },
                            v5 /*: any*/,
                            v6 /*: any*/,
                            v7 /*: any*/,
                            v8 /*: any*/,
                            v9 /*: any*/,
                            v10 /*: any*/,
                            {
                              alias: null,
                              args: v11 /*: any*/,
                              concreteType: "ReplyConnection",
                              kind: "LinkedField",
                              name: "replies",
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
                                        v3 /*: any*/,
                                        {
                                          alias: null,
                                          args: null,
                                          kind: "ScalarField",
                                          name: "comment_gid",
                                          storageKey: null,
                                        },
                                        v5 /*: any*/,
                                        v6 /*: any*/,
                                        v7 /*: any*/,
                                        v8 /*: any*/,
                                        v9 /*: any*/,
                                        v10 /*: any*/,
                                        v2 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v12 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                                v13 /*: any*/,
                              ],
                              storageKey: 'replies(after:"",first:0)',
                            },
                            {
                              alias: null,
                              args: v11 /*: any*/,
                              filters: null,
                              handle: "connection",
                              key: "Replies_query_replies",
                              kind: "LinkedHandle",
                              name: "replies",
                            },
                            v2 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v12 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v13 /*: any*/,
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v4 /*: any*/,
                  filters: null,
                  handle: "connection",
                  key: "Comments_query_comments",
                  kind: "LinkedHandle",
                  name: "comments",
                },
              ],
              type: "Module",
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "c72d96dce4559ae7a0450204964da568",
      id: null,
      metadata: {},
      name: "CommentsPaginationModule",
      operationKind: "query",
      text: 'query CommentsPaginationModule(\n  $count: Int = 5\n  $cursor: String = ""\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Comments_module_1G22uz\n    id\n  }\n}\n\nfragment Comment_comments on Comment {\n  id\n  module_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n  ...Replies_query\n}\n\nfragment Comments_module_1G22uz on Module {\n  comments(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...Comment_comments\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment Replies_query on Comment {\n  id\n  replies(first: 0, after: "") {\n    edges {\n      node {\n        id\n        ...Reply_replies\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Reply_replies on Reply {\n  id\n  comment_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n}\n',
    },
  };
})();

(node as any).hash = "f9bd98b2f8b28ea417a0ec4f6d65ba23";

export default node;
