/**
 * @generated SignedSource<<d2c8e018df31a124891b7e42f4e65bcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppQuery$variables = {};
export type AppQueryVariables = AppQuery$variables;
export type AppQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"Routes_user">;
  };
};
export type AppQueryResponse = AppQuery$data;
export type AppQuery = {
  variables: AppQueryVariables;
  response: AppQuery$data;
};

const node: ConcreteRequest = (function () {
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
      name: "technology_gid",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "total",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "default_module_gid",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "user_gid",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "order",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "duration",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "comment_gid",
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
    v11 = {
      kind: "Literal",
      name: "after",
      value: "",
    },
    v12 = [
      v11 /*: any*/,
      {
        kind: "Literal",
        name: "first",
        value: 5,
      },
    ],
    v13 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "module_gid",
      storageKey: null,
    },
    v14 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "likes",
      storageKey: null,
    },
    v15 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "text",
      storageKey: null,
    },
    v16 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "user_username",
      storageKey: null,
    },
    v17 = [
      v11 /*: any*/,
      {
        kind: "Literal",
        name: "first",
        value: 0,
      },
    ],
    v18 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v19 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cursor",
      storageKey: null,
    },
    v20 = {
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
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "AppQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "User",
          kind: "LinkedField",
          name: "user",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "Routes_user",
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
      argumentDefinitions: [],
      kind: "Operation",
      name: "AppQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "User",
          kind: "LinkedField",
          name: "user",
          plural: false,
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
              kind: "ScalarField",
              name: "email",
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
                v1 /*: any*/,
                v2 /*: any*/,
                v0 /*: any*/,
                v3 /*: any*/,
                v4 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "default_technology_gid",
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
                v5 /*: any*/,
                v2 /*: any*/,
                v6 /*: any*/,
                v3 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Module",
              kind: "LinkedField",
              name: "module",
              plural: false,
              selections: [
                v0 /*: any*/,
                v5 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "date",
                  storageKey: null,
                },
                v7 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: "Like",
                  kind: "LinkedField",
                  name: "likes",
                  plural: true,
                  selections: [
                    v0 /*: any*/,
                    v8 /*: any*/,
                    v4 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "status",
                      storageKey: null,
                    },
                    v9 /*: any*/,
                    v10 /*: any*/,
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v12 /*: any*/,
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
                            v0 /*: any*/,
                            v13 /*: any*/,
                            v14 /*: any*/,
                            v15 /*: any*/,
                            v4 /*: any*/,
                            v16 /*: any*/,
                            v9 /*: any*/,
                            v10 /*: any*/,
                            {
                              alias: null,
                              args: v17 /*: any*/,
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
                                        v0 /*: any*/,
                                        v8 /*: any*/,
                                        v14 /*: any*/,
                                        v15 /*: any*/,
                                        v4 /*: any*/,
                                        v16 /*: any*/,
                                        v9 /*: any*/,
                                        v10 /*: any*/,
                                        v18 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v19 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                                v20 /*: any*/,
                              ],
                              storageKey: 'replies(after:"",first:0)',
                            },
                            {
                              alias: null,
                              args: v17 /*: any*/,
                              filters: null,
                              handle: "connection",
                              key: "Replies_query_replies",
                              kind: "LinkedHandle",
                              name: "replies",
                            },
                            v18 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        v19 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    v20 /*: any*/,
                  ],
                  storageKey: 'comments(after:"",first:5)',
                },
                {
                  alias: null,
                  args: v12 /*: any*/,
                  filters: null,
                  handle: "connection",
                  key: "Comments_query_comments",
                  kind: "LinkedHandle",
                  name: "comments",
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Playlist",
              kind: "LinkedField",
              name: "playlist",
              plural: true,
              selections: [
                v0 /*: any*/,
                v5 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "thumbnail",
                  storageKey: null,
                },
                v7 /*: any*/,
                v6 /*: any*/,
                v1 /*: any*/,
                v13 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Coursing",
              kind: "LinkedField",
              name: "coursing",
              plural: true,
              selections: [
                v0 /*: any*/,
                v13 /*: any*/,
                v4 /*: any*/,
                v1 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "progress",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "completed",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "df43004429cdea94478e1ced12992154",
      id: null,
      metadata: {},
      name: "AppQuery",
      operationKind: "query",
      text: 'query AppQuery {\n  user {\n    ...Routes_user\n    id\n  }\n}\n\nfragment Comment_comments on Comment {\n  id\n  module_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n  ...Replies_query\n}\n\nfragment Comment_user on User {\n  id\n  username\n}\n\nfragment Comments_data_user on User {\n  ...Comment_user\n}\n\nfragment Comments_module on Module {\n  comments(first: 5, after: "") {\n    edges {\n      node {\n        id\n        ...Comment_comments\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment CoursingModule_user on User {\n  module {\n    id\n    title\n    date\n    duration\n    likes {\n      id\n      comment_gid\n      user_gid\n      status\n      created_at\n      updated_at\n    }\n    ...Comments_module\n  }\n  id\n}\n\nfragment CoursingModule_user_3A4PYe on User {\n  module {\n    id\n    title\n    date\n    duration\n    likes {\n      id\n      comment_gid\n      user_gid\n      status\n      created_at\n      updated_at\n    }\n    ...Comments_module\n  }\n  id\n}\n\nfragment CoursingUser_user on User {\n  id\n  username\n  coursed {\n    id\n    technology_gid\n    default_module_gid\n    user_gid\n    total\n  }\n  technologies {\n    id\n    title\n    total\n    order\n    default_module_gid\n  }\n  ...Comments_data_user\n}\n\nfragment Coursing_user on User {\n  playlist {\n    id\n    title\n    thumbnail\n    duration\n    order\n    technology_gid\n    module_gid\n  }\n  coursing {\n    id\n    module_gid\n    user_gid\n    technology_gid\n    progress\n    completed\n  }\n  default_technology_gid\n  ...CoursingModule_user_3A4PYe\n  id\n}\n\nfragment Replies_query on Comment {\n  id\n  replies(first: 0, after: "") {\n    edges {\n      node {\n        id\n        ...Reply_replies\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Reply_replies on Reply {\n  id\n  comment_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n}\n\nfragment Routes_user on User {\n  id\n  username\n  email\n  coursed {\n    technology_gid\n    total\n    id\n  }\n  default_technology_gid\n  ...Technologies_user\n  ...CoursingModule_user\n  ...Coursing_user\n  ...CoursingUser_user\n}\n\nfragment Technologies_user on User {\n  id\n  technologies {\n    id\n    title\n    total\n    order\n    default_module_gid\n  }\n  coursed {\n    technology_gid\n    total\n    default_module_gid\n    id\n  }\n}\n',
    },
  };
})();

(node as any).hash = "eccc015991805a6365c790fed1a22a15";

export default node;
