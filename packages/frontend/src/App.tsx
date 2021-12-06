import { Routes } from "./Routes";
import { FC, Suspense, useCallback } from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
  PreloadedQuery,
  useQueryLoader,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import AppQuery, {
  AppQuery as AppQueryType,
} from "./__generated__/AppQuery.graphql";

export const tokensAndData: {
  refetchUser: () => void;
  accessToken: string | undefined;
} = {
  accessToken: undefined,
  refetchUser: () => {},
};

const RepositoryNameQuery = graphql`
  query AppQuery {
    user {
      ...Routes_user
    }
  }
`;

const preloadedQuery = loadQuery<AppQueryType>(
  RelayEnvironment,
  RepositoryNameQuery,
  {}
);

const App: FC<{ preloadedQuery: PreloadedQuery<AppQueryType> }> = (props) => {
  const [commit] = useMutation(graphql`
    mutation AppLogOutMutation($input: LogOutInput!) {
      logOut(input: $input) {
        error
      }
    }
  `);
  const [queryRef, loadQuery] = useQueryLoader<AppQueryType>(
    AppQuery,
    props.preloadedQuery
  );
  const data = usePreloadedQuery<AppQueryType>(
    RepositoryNameQuery,
    queryRef || props.preloadedQuery
  );
  const refetchUser = useCallback(() => {
    if (!tokensAndData.accessToken) {
      commit({
        variables: {
          input: {},
        },
        onCompleted: () => {
          loadQuery({}, { fetchPolicy: "network-only" });
        },
      });
      return;
    }
    loadQuery({}, { fetchPolicy: "network-only" });
  }, [loadQuery, commit]);
  tokensAndData.refetchUser = refetchUser;
  return <Routes data={data.user} />;
};

const AppRoot = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default AppRoot;
