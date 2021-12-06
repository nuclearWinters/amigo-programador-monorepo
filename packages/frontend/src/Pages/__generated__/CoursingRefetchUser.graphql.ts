/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CoursingRefetchUserVariables = {
    module_gid?: string | null | undefined;
    technology_gid?: string | null | undefined;
    id: string;
};
export type CoursingRefetchUserResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"Coursing_user">;
    } | null;
};
export type CoursingRefetchUser = {
    readonly response: CoursingRefetchUserResponse;
    readonly variables: CoursingRefetchUserVariables;
};



/*
query CoursingRefetchUser(
  $module_gid: ID
  $technology_gid: ID
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...Coursing_user_4jxHuc
    id
  }
}

fragment Comment_comments on Comment {
  id
  module_gid
  likes
  text
  user_gid
  user_username
  created_at
  updated_at
  ...Replies_query
}

fragment Comments_module on Module {
  comments(first: 5, after: "") {
    edges {
      node {
        id
        ...Comment_comments
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}

fragment CoursingModule_user_40ZWfb on User {
  module(module_gid: $module_gid) {
    id
    title
    date
    duration
    likes {
      id
      comment_gid
      user_gid
      status
      created_at
      updated_at
    }
    ...Comments_module
  }
  id
}

fragment Coursing_user_4jxHuc on User {
  playlist(technology_gid: $technology_gid) {
    id
    title
    thumbnail
    duration
    order
    technology_gid
    module_gid
  }
  coursing(technology_gid: $technology_gid) {
    id
    module_gid
    user_gid
    technology_gid
    progress
    completed
  }
  default_technology_gid
  ...CoursingModule_user_40ZWfb
  id
}

fragment Replies_query on Comment {
  id
  replies(first: 0, after: "") {
    edges {
      node {
        id
        ...Reply_replies
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment Reply_replies on Reply {
  id
  comment_gid
  likes
  text
  user_gid
  user_username
  created_at
  updated_at
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "module_gid"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "technology_gid"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
  "kind": "Variable",
  "name": "module_gid",
  "variableName": "module_gid"
},
v5 = {
  "kind": "Variable",
  "name": "technology_gid",
  "variableName": "technology_gid"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v5/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "technology_gid",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "module_gid",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "user_gid",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comment_gid",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
},
v17 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v18 = [
  (v17/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likes",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "user_username",
  "storageKey": null
},
v22 = [
  (v17/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
],
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CoursingRefetchUser",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "Coursing_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CoursingRefetchUser",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "Playlist",
                "kind": "LinkedField",
                "name": "playlist",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "thumbnail",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "order",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "Coursing",
                "kind": "LinkedField",
                "name": "coursing",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "progress",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "completed",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "default_technology_gid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  (v4/*: any*/)
                ],
                "concreteType": "Module",
                "kind": "LinkedField",
                "name": "module",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "date",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Like",
                    "kind": "LinkedField",
                    "name": "likes",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v14/*: any*/),
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v18/*: any*/),
                    "concreteType": "CommentConnection",
                    "kind": "LinkedField",
                    "name": "comments",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommentEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Comment",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v12/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v13/*: any*/),
                              (v21/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              {
                                "alias": null,
                                "args": (v22/*: any*/),
                                "concreteType": "ReplyConnection",
                                "kind": "LinkedField",
                                "name": "replies",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ReplyEdge",
                                    "kind": "LinkedField",
                                    "name": "edges",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Reply",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v7/*: any*/),
                                          (v14/*: any*/),
                                          (v19/*: any*/),
                                          (v20/*: any*/),
                                          (v13/*: any*/),
                                          (v21/*: any*/),
                                          (v15/*: any*/),
                                          (v16/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v23/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v24/*: any*/)
                                ],
                                "storageKey": "replies(after:\"\",first:0)"
                              },
                              {
                                "alias": null,
                                "args": (v22/*: any*/),
                                "filters": null,
                                "handle": "connection",
                                "key": "Replies_query_replies",
                                "kind": "LinkedHandle",
                                "name": "replies"
                              },
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v23/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v24/*: any*/)
                    ],
                    "storageKey": "comments(after:\"\",first:5)"
                  },
                  {
                    "alias": null,
                    "args": (v18/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "Comments_query_comments",
                    "kind": "LinkedHandle",
                    "name": "comments"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b61baa23b524086f0ee2afcfce04b47",
    "id": null,
    "metadata": {},
    "name": "CoursingRefetchUser",
    "operationKind": "query",
    "text": "query CoursingRefetchUser(\n  $module_gid: ID\n  $technology_gid: ID\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Coursing_user_4jxHuc\n    id\n  }\n}\n\nfragment Comment_comments on Comment {\n  id\n  module_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n  ...Replies_query\n}\n\nfragment Comments_module on Module {\n  comments(first: 5, after: \"\") {\n    edges {\n      node {\n        id\n        ...Comment_comments\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment CoursingModule_user_40ZWfb on User {\n  module(module_gid: $module_gid) {\n    id\n    title\n    date\n    duration\n    likes {\n      id\n      comment_gid\n      user_gid\n      status\n      created_at\n      updated_at\n    }\n    ...Comments_module\n  }\n  id\n}\n\nfragment Coursing_user_4jxHuc on User {\n  playlist(technology_gid: $technology_gid) {\n    id\n    title\n    thumbnail\n    duration\n    order\n    technology_gid\n    module_gid\n  }\n  coursing(technology_gid: $technology_gid) {\n    id\n    module_gid\n    user_gid\n    technology_gid\n    progress\n    completed\n  }\n  default_technology_gid\n  ...CoursingModule_user_40ZWfb\n  id\n}\n\nfragment Replies_query on Comment {\n  id\n  replies(first: 0, after: \"\") {\n    edges {\n      node {\n        id\n        ...Reply_replies\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Reply_replies on Reply {\n  id\n  comment_gid\n  likes\n  text\n  user_gid\n  user_username\n  created_at\n  updated_at\n}\n"
  }
};
})();
(node as any).hash = 'f15707f888760c31a92e854856477554';
export default node;
