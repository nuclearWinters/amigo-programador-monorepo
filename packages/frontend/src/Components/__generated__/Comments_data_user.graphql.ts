/**
 * @generated SignedSource<<e7cd66f0fcd4d9c0af2b7821206aa886>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Comments_data_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Comment_user">;
  readonly " $fragmentType": "Comments_data_user";
};
export type Comments_data_user = Comments_data_user$data;
export type Comments_data_user$key = {
  readonly " $data"?: Comments_data_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Comments_data_user">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "Comments_data_user",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "Comment_user",
    },
  ],
  type: "User",
  abstractKey: null,
};

(node as any).hash = "00a840a24d9854440721c9e1d4552507";

export default node;
