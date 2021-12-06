import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

const fetchRelay: FetchFunction = (params, variables) => {
  return fetchGraphQL(params.text, variables);
};

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
