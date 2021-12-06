/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Reply_replies = {
    readonly id: string;
    readonly comment_gid: string;
    readonly likes: number;
    readonly text: string;
    readonly user_gid: string;
    readonly user_username: string;
    readonly created_at: number | null;
    readonly updated_at: number | null;
    readonly " $refType": "Reply_replies";
};
export type Reply_replies$data = Reply_replies;
export type Reply_replies$key = {
    readonly " $data"?: Reply_replies$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Reply_replies">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Reply_replies",
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
      "name": "comment_gid",
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
    }
  ],
  "type": "Reply",
  "abstractKey": null
};
(node as any).hash = 'ec125ea3b4fd433f028f3c5a07edc16e';
export default node;
