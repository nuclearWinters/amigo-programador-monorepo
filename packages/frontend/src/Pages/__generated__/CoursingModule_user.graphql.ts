/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import CoursingModuleRefetchUser from "./CoursingModuleRefetchUser.graphql";
import { FragmentRefs } from "relay-runtime";
export type CoursingModule_user = {
    readonly module: {
        readonly id: string;
        readonly title: string;
        readonly date: number;
        readonly duration: string;
        readonly likes: ReadonlyArray<{
            readonly id: string;
            readonly comment_gid: string;
            readonly user_gid: string;
            readonly status: boolean;
            readonly created_at: number;
            readonly updated_at: number;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"Comments_module">;
    };
    readonly id: string;
    readonly " $refType": "CoursingModule_user";
};
export type CoursingModule_user$data = CoursingModule_user;
export type CoursingModule_user$key = {
    readonly " $data"?: CoursingModule_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CoursingModule_user">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "module_gid"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": CoursingModuleRefetchUser,
      "identifierField": "id"
    }
  },
  "name": "CoursingModule_user",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "module_gid",
          "variableName": "module_gid"
        }
      ],
      "concreteType": "Module",
      "kind": "LinkedField",
      "name": "module",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "duration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Like",
          "kind": "LinkedField",
          "name": "likes",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "comment_gid",
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
              "name": "status",
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Comments_module"
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = '3326d72c8baabce32988b2f09cdfe051';
export default node;
