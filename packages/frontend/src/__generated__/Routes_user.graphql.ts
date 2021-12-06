/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Routes_user = {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly coursed: ReadonlyArray<{
        readonly technology_gid: string;
        readonly total: number;
    }>;
    readonly default_technology_gid: string;
    readonly " $fragmentRefs": FragmentRefs<"Technologies_user" | "CoursingModule_user" | "Coursing_user" | "CoursingUser_user">;
    readonly " $refType": "Routes_user";
};
export type Routes_user$data = Routes_user;
export type Routes_user$key = {
    readonly " $data"?: Routes_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Routes_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Routes_user",
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
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Coursed",
      "kind": "LinkedField",
      "name": "coursed",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "technology_gid",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Technologies_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CoursingModule_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Coursing_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CoursingUser_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '7667dac1c8aea7330f54704746a9826c';
export default node;
