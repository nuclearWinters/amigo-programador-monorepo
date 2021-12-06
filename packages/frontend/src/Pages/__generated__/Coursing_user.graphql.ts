/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import CoursingRefetchUser from "./CoursingRefetchUser.graphql";
import { FragmentRefs } from "relay-runtime";
export type Coursing_user = {
    readonly playlist: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
        readonly thumbnail: string;
        readonly duration: string;
        readonly order: number;
        readonly technology_gid: string;
        readonly module_gid: string;
    }>;
    readonly coursing: ReadonlyArray<{
        readonly id: string;
        readonly module_gid: string;
        readonly user_gid: string;
        readonly technology_gid: string;
        readonly progress: string;
        readonly completed: number;
    }>;
    readonly default_technology_gid: string;
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"CoursingModule_user">;
    readonly " $refType": "Coursing_user";
};
export type Coursing_user$data = Coursing_user;
export type Coursing_user$key = {
    readonly " $data"?: Coursing_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Coursing_user">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "technology_gid",
    "variableName": "technology_gid"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "technology_gid",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "module_gid",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "module_gid"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "technology_gid"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": CoursingRefetchUser,
      "identifierField": "id"
    }
  },
  "name": "Coursing_user",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Playlist",
      "kind": "LinkedField",
      "name": "playlist",
      "plural": true,
      "selections": [
        (v1/*: any*/),
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
          "name": "thumbnail",
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
          "kind": "ScalarField",
          "name": "order",
          "storageKey": null
        },
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Coursing",
      "kind": "LinkedField",
      "name": "coursing",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "user_gid",
          "storageKey": null
        },
        (v2/*: any*/),
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
    (v1/*: any*/),
    {
      "args": [
        {
          "kind": "Variable",
          "name": "module_gid",
          "variableName": "module_gid"
        }
      ],
      "kind": "FragmentSpread",
      "name": "CoursingModule_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = 'f15707f888760c31a92e854856477554';
export default node;
