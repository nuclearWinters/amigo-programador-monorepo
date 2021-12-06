/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Comment_comments = {
    readonly id: string;
    readonly module_gid: string;
    readonly likes: number;
    readonly text: string;
    readonly user_gid: string;
    readonly user_username: string;
    readonly created_at: number | null;
    readonly updated_at: number | null;
    readonly " $fragmentRefs": FragmentRefs<"Replies_query">;
    readonly " $refType": "Comment_comments";
};
export type Comment_comments$data = Comment_comments;
export type Comment_comments$key = {
    readonly " $data"?: Comment_comments$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Comment_comments">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Comment_comments",
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
      "name": "module_gid",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Replies_query"
    }
  ],
  "type": "Comment",
  "abstractKey": null
};
(node as any).hash = '0c3f81de2381caa8094643a1ec5c35c6';
export default node;
