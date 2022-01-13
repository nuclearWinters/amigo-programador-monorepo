/**
 * @generated SignedSource<<0e1847e30dd723426e2dbb497d264a50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Comment_user$data = {
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "Comment_user";
};
export type Comment_user = Comment_user$data;
export type Comment_user$key = {
  readonly " $data"?: Comment_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Comment_user">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "Comment_user",
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
      name: "username",
      storageKey: null,
    },
  ],
  type: "User",
  abstractKey: null,
};

(node as any).hash = "e21bb54b20b899bfadaeec1ab21aefbc";

export default node;
