/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Comments_data_user = {
    readonly " $fragmentRefs": FragmentRefs<"Comment_user">;
    readonly " $refType": "Comments_data_user";
};
export type Comments_data_user$data = Comments_data_user;
export type Comments_data_user$key = {
    readonly " $data"?: Comments_data_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Comments_data_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Comments_data_user",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Comment_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '00a840a24d9854440721c9e1d4552507';
export default node;
