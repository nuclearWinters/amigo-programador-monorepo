import { graphql } from "babel-plugin-relay/macro";
import { FC } from "react";
import { useFragment, useMutation } from "react-relay";
import { useNavigate } from "react-router";
import { tokensAndData } from "../App";
import { logOut } from "../utils";
import { TechnologiesUpdateDefaultTechnologyMutation } from "./__generated__/TechnologiesUpdateDefaultTechnologyMutation.graphql";
import { Technologies_user$key } from "./__generated__/Technologies_user.graphql";

const technologiesFragment = graphql`
  fragment Technologies_user on User {
    id
    technologies {
      id
      title
      total
      order
      default_module_gid
    }
    coursed {
      technology_gid
      total
      default_module_gid
    }
  }
`;

type Props = {
  data: Technologies_user$key;
};

export const TechTree: FC<Props> = (props) => {
  const data = useFragment(technologiesFragment, props.data);
  const navigate = useNavigate();
  const [commit] =
    useMutation<TechnologiesUpdateDefaultTechnologyMutation>(graphql`
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
    `);
  return (
    <div>
      <h2>Tech Tree</h2>
      {data.technologies.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(`/course/${item.id}`);
            commit({
              variables: {
                input: {
                  user_gid: data.id,
                  technology_gid: item.id,
                },
              },
              onCompleted: (response) => {
                if (response.updateDefaultTechnology.error) {
                  if (
                    response.updateDefaultTechnology.error === "jwt expired"
                  ) {
                    logOut();
                  }
                  return window.alert(response.updateDefaultTechnology.error);
                }
                tokensAndData.accessToken =
                  response.updateDefaultTechnology.accessToken;
                tokensAndData.refetchUser();
              },
            });
          }}
        >
          <div>{item.title}</div>
          <div>
            {data.coursed.find((coursed) => coursed.technology_gid === item.id)
              ?.total ?? 0}{" "}
            / {item.total}
          </div>
        </div>
      ))}
    </div>
  );
};
