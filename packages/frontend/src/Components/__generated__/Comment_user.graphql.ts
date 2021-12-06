/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Comment_user = {
    readonly id: string;
    readonly username: string;
    readonly " $refType": "Comment_user";
};
export type Comment_user$data = Comment_user;
export type Comment_user$key = {
    readonly " $data"?: Comment_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Comment_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Comment_user",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'e21bb54b20b899bfadaeec1ab21aefbc';
export default node;
