/**
 * @generated SignedSource<<a1be9a72688792e571bc14e900ff619e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CoursingModuleRefetchUser$variables = {
  module_gid?: string | null;
  id: string;
};
export type CoursingModuleRefetchUserVariables =
  CoursingModuleRefetchUser$variables;
export type CoursingModuleRefetchUser$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CoursingModule_user">;
  } | null;
};
export type CoursingModuleRefetchUserResponse = CoursingModuleRefetchUser$data;
export type CoursingModuleRefetchUser = {
  variables: CoursingModuleRefetchUserVariables;
  response: CoursingModuleRefetchUser$data;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "id",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "module_gid",
    },
    v2 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v3 = [
      {
        kind: "Variable",
        name: "module_gid",
        variableName: "module_gid",
      },
    ],
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "comment_gid",
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
      name: "created_at",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "updated_at",
      storageKey: null,
    },
    v10 = {
      kind: "Literal",
      name: "after",
      value: "",
    },
    v11 = [
      v10 /*: any*/,
      {
        kind: "Literal",
        name: "first",
        value: 5,
      },
    ],
    v12 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "likes",
      storageKey: null,
    },
    v13 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "text",
      storageKey: null,
    },
    v14 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "user_username",
      storageKey: null,
    },
    v15 = [
      v10 /*: any*/,
      {
        kind: "Literal",
        name: "first",
        value: 0,
      },
    ],
    v16 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cursor",
      storageKey: null,
    },
    v17 = {
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "CoursingModuleRefetchUser",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              args: v3 /*: any*/,
              kind: "FragmentSpread",
              name: "CoursingModule_user",
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: "Operation",
      name: "CoursingModuleRefetchUser",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            v4 /*: any*/,
            v5 /*: any*/,
            {
              kind: "InlineFragment",
              selections: [
                {
                  alias: null,
                  args: v3 /*: any*/,
                  concreteType: "Module",
                  kind: "LinkedField",
                  name: "module",
                  plural: false,
                  selections: [
                    v5 /*: any*/,
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
                        v5 /*: any*/,
                        v6 /*: any*/,
                        v7 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "status",
                          storageKey: null,
                        },
                        v8 /*: any*/,
                        v9 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: v11 /*: any*/,
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
                                v5 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  kind: "ScalarField",
                                  name: "module_gid",
                                  storageKey: null,
                                },
                                v12 /*: any*/,
                                v13 /*: any*/,
                                v7 /*: any*/,
                                v14 /*: any*/,
                                v8 /*: any*/,
                                v9 /*: any*/,
                                {
                                  alias: null,
                                  args: v15 /*: any*/,
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
                                            v5 /*: any*/,
                                            v6 /*: any*/,
                                            v12 /*: any*/,
                                            v13 /*: any*/,
                                            v7 /*: any*/,
                                            v14 /*: any*/,
                                            v8 /*: any*/,
                                            v9 /*: any*/,
                                            v4 /*: any*/,
                                          ],
                                          storageKey: null,
                                        },
                                        v16 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v17 /*: any*/,
                                  ],
                                  storageKey: 'replies(after:"",first:0)',
                                },
                                {
                                  alias: null,
                                  args: v15 /*: any*/,
                                  filters: null,
                                  handle: "connection",
                                  key: "Replies_query_replies",
                                  kind: "LinkedHandle",
                                  name: "replies",
                                },
                                v4 /*: any*/,
                              ],
                              storageKey: null,
                            },
                            v16 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v17 /*: any*/,
                      ],
                      storageKey: 'comments(after:"",first:5)',
                    },
                    {
                      alias: null,
                      args: v11 /*: any*/,
                      filters: null,
                      handle: "connection",
                      key: "Comments_query_comments",
                      kind: "LinkedHandle",
                      name: "comments",
                    },
                  ],
                  storageKey: null,
                },
              ],
              type: "User",
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "fb1fe8b744f5f8adf5d7483b378c7717",
      id: null,
      metadata: {},
      name: "CoursingModuleRefetchUser",
      operationKind: "query",
      text: 'query CoursingModuleRefetchUser(\n  $module_gid: ID\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CoursingModule_user_40ZWfb\n    id\n  }\n}\n\nfragment Comment_comments on Comment {\n  id\n  module_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n  ...Replies_query\n}\n\nfragment Comments_module on Module {\n  comments(first: 5, after: "") {\n    edges {\n      node {\n        id\n        ...Comment_comments\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment CoursingModule_user_40ZWfb on User {\n  module(module_gid: $module_gid) {\n    id\n    title\n    date\n    duration\n    likes {\n      id\n      comment_gid\n      user_gid\n      status\n      created_at\n      updated_at\n    }\n    ...Comments_module\n  }\n  id\n}\n\nfragment Replies_query on Comment {\n  id\n  replies(first: 0, after: "") {\n    edges {\n      node {\n        id\n        ...Reply_replies\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Reply_replies on Reply {\n  id\n  comment_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n}\n',
    },
  };
})();

(node as any).hash = "3326d72c8baabce32988b2f09cdfe051";

export default node;
