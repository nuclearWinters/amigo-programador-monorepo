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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tech-tree">Tech Tree</Link>
            </li>
            <li>
              <Link to={`/course`}>Continue</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li
              onClick={() => {
                logOut();
              }}
            >
              <Link to="/">Log Out</Link>
            </li>
          </ul>
        </nav>
        <BrowserRoutes>
          <Route path="/tech-tree" element={<TechTree data={data} />} />
          <Route
            path="/course"
            element={
              <Navigate replace to={`/course/${data.default_technology_gid}`} />
            }
          />
          <Route
            path="/course/:technology_gid"
            element={<Coursing data={data} />}
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </BrowserRoutes>
      </div>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}
