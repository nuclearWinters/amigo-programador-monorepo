/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AddCommentInput = {
    comment: string;
    module_gid: string;
    user_gid: string;
    user_username: string;
    clientMutationId?: string | null | undefined;
};
export type CoursingAddCommentMutationVariables = {
    input: AddCommentInput;
};
export type CoursingAddCommentMutationResponse = {
    readonly addComment: {
        readonly error: string;
        readonly comment_edge: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly likes: number;
                readonly module_gid: string;
                readonly text: string;
                readonly user_gid: string;
                readonly user_username: string;
                readonly created_at: number | null;
                readonly updated_at: number | null;
            } | null;
        } | null;
        readonly accessToken: string;
    };
};
export type CoursingAddCommentMutation = {
    readonly response: CoursingAddCommentMutationResponse;
    readonly variables: CoursingAddCommentMutationVariables;
};



/*
mutation CoursingAddCommentMutation(
  $input: AddCommentInput!
) {
  addComment(input: $input) {
    error
    comment_edge {
      cursor
      node {
        id
        likes
        module_gid
        text
        user_gid
        user_username
        created_at
        updated_at
      }
    }
    accessToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddCommentPayload",
    "kind": "LinkedField",
    "name": "addComment",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CommentEdge",
        "kind": "LinkedField",
        "name": "comment_edge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "likes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "module_gid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "user_gid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "user_username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "created_at",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updated_at",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CoursingAddCommentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CoursingAddCommentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e00517e8fa8e83697d2b9e06e999f847",
    "id": null,
    "metadata": {},
    "name": "CoursingAddCommentMutation",
    "operationKind": "mutation",
    "text": "mutation CoursingAddCommentMutation(\n  $input: AddCommentInput!\n) {\n  addComment(input: $input) {\n    error\n    comment_edge {\n      cursor\n      node {\n        id\n        likes\n        module_gid\n        text\n        user_gid\n        user_username\n        created_at\n        updated_at\n      }\n    }\n    accessToken\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b6aefd557378d1bf7abd3c55cd0b39be';
export default node;
