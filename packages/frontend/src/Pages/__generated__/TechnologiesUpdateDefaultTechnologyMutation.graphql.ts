/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateDefaultTechnologyInput = {
    user_gid: string;
    technology_gid: string;
    clientMutationId?: string | null | undefined;
};
export type TechnologiesUpdateDefaultTechnologyMutationVariables = {
    input: UpdateDefaultTechnologyInput;
};
export type TechnologiesUpdateDefaultTechnologyMutationResponse = {
    readonly updateDefaultTechnology: {
        readonly error: string;
        readonly user: {
            readonly id: string;
            readonly default_technology_gid: string;
        };
        readonly accessToken: string;
    };
};
export type TechnologiesUpdateDefaultTechnologyMutation = {
    readonly response: TechnologiesUpdateDefaultTechnologyMutationResponse;
    readonly variables: TechnologiesUpdateDefaultTechnologyMutationVariables;
};



/*
mutation TechnologiesUpdateDefaultTechnologyMutation(
  $input: UpdateDefaultTechnologyInput!
) {
  updateDefaultTechnology(input: $input) {
    error
    user {
      id
      default_technology_gid
    }
    accessToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateDefaultTechnologyPayload",
    "kind": "LinkedField",
    "name": "updateDefaultTechnology",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
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
            "name": "default_technology_gid",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TechnologiesUpdateDefaultTechnologyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TechnologiesUpdateDefaultTechnologyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0c4db40a91882a03fc04c2f3e4da2c80",
    "id": null,
    "metadata": {},
    "name": "TechnologiesUpdateDefaultTechnologyMutation",
    "operationKind": "mutation",
    "text": "mutation TechnologiesUpdateDefaultTechnologyMutation(\n  $input: UpdateDefaultTechnologyInput!\n) {\n  updateDefaultTechnology(input: $input) {\n    error\n    user {\n      id\n      default_technology_gid\n    }\n    accessToken\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bcd875bcfda7bca24a01c367831dba7d';
export default node;
