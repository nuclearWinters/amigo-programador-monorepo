/**
 * @generated SignedSource<<459dd7df82aa099bef625179be694455>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type AddReplyInput = {
  reply: string;
  comment_gid: string;
  user_gid: string;
  user_username: string;
  clientMutationId?: string | null;
};
export type CommentAddReplyMutation$variables = {
  input: AddReplyInput;
};
export type CommentAddReplyMutationVariables =
  CommentAddReplyMutation$variables;
export type CommentAddReplyMutation$data = {
  readonly addReply: {
    readonly error: string;
    readonly reply_edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly likes: number;
        readonly comment_gid: string;
        readonly text: string;
        readonly user_gid: string;
        readonly user_username: string;
        readonly created_at: Int | null;
        readonly updated_at: Int | null;
      } | null;
    } | null;
    readonly accessToken: string;
  };
};
export type CommentAddReplyMutationResponse = CommentAddReplyMutation$data;
export type CommentAddReplyMutation = {
  variables: CommentAddReplyMutationVariables;
  response: CommentAddReplyMutation$data;
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
        concreteType: "AddReplyPayload",
        kind: "LinkedField",
        name: "addReply",
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
            concreteType: "ReplyEdge",
            kind: "LinkedField",
            name: "reply_edge",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "cursor",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "Reply",
                kind: "LinkedField",
                name: "node",
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
                    name: "likes",
                    storageKey: null,
                  },
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
                    name: "text",
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
                    name: "user_username",
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
      name: "CommentAddReplyMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "CommentAddReplyMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "60c9283044bd728948e1916062fcb010",
      id: null,
      metadata: {},
      name: "CommentAddReplyMutation",
      operationKind: "mutation",
      text: "mutation CommentAddReplyMutation(\n  $input: AddReplyInput!\n) {\n  addReply(input: $input) {\n    error\n    reply_edge {\n      cursor\n      node {\n        id\n        likes\n        comment_gid\n        text\n        user_gid\n        user_username\n        created_at\n        updated_at\n      }\n    }\n    accessToken\n  }\n}\n",
    },
  };
})();

(node as any).hash = "4c17c13d67f4b79ab537d26812ed5b1e";

export default node;
