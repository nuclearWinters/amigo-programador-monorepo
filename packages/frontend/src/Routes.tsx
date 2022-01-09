import { FC } from "react";
import { useFragment } from "react-relay";
import {
  BrowserRouter as Router,
  Routes as BrowserRoutes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { TechTree } from "./Pages/Technologies";
import { Coursing } from "./Pages/Coursing";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { Routes_user$key } from "./__generated__/Routes_user.graphql";
import { logOut } from "./utils";
import { LoginButton } from "./Components/Button/LoginButton";
import { SignUpButton } from "./Components/Button/SignUpButton";
import { LogOutButton } from "./Components/Button/LogOutButton";
import { LinkButton } from "./Components/Button/LinkButton";

const routesFragment = graphql`
  fragment Routes_user on User {
    id
    username
    email
    coursed {
      technology_gid
      total
    }
    default_technology_gid
    ...Technologies_user
    ...CoursingModule_user
    ...Coursing_user
    ...CoursingUser_user
  }
`;

type Props = {
  data: Routes_user$key;
};

export const Routes: FC<Props> = (props: Props) => {
  const data = useFragment<Routes_user$key>(routesFragment, props.data);
  return (
    <Router>
      <div>
        <nav>
          <Link to="/home">
            <LinkButton link="/home">Home</LinkButton>
          </Link>
          <Link to="/tech-tree">
            <LinkButton link="/tech-tree">Tech Tree</LinkButton>
          </Link>
          <Link to={`/course`}>
            <LinkButton link="/course">Continue</LinkButton>
          </Link>
          {data.username ? null : (
            <>
              <Link to="/login">
                <LoginButton>Login</LoginButton>
              </Link>
              <Link to="/signup">
                <SignUpButton>Sign Up</SignUpButton>
              </Link>
            </>
          )}
          {data.username ? (
            <Link to="/">
              <LogOutButton onClick={logOut}>Log Out</LogOutButton>
            </Link>
          ) : null}
        </nav>
        <BrowserRoutes>
          <Route path="/tech-tree" element={<TechTree data={data} />} />
          <Route path="/" element={<Navigate to={`/home`} replace={true} />} />
          <Route
            path="/course"
            element={
              <Navigate
                to={`/course/${data.default_technology_gid}`}
                replace={true}
              />
            }
          />
          <Route
            path="/course/:technology_gid"
            element={<Coursing data={data} />}
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </BrowserRoutes>
      </div>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}
