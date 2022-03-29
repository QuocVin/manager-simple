import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./layouts";
import { RoutesApp, ManagerRoute, RegisterRoute, GuestRoute, RoutePaths } from "./routes/route"
import { getAuthLS, LS_KEY, clearAuthLS } from '../src/helpers/localStorage';
import { ROLE } from './common';
import cookies from 'react-cookies';

function App() {
  let loggedIn = getAuthLS(LS_KEY.R0LE) ? true : false;
  const check = getAuthLS(LS_KEY.R0LE)
  if (cookies.load("user") == null || !loggedIn) {
    loggedIn = false;
    clearAuthLS();
    cookies.remove("user");
    cookies.remove("access_token");
  };

  function GuestLayout(props) {
    return (
      <Layout {...props}>
        <Switch>
          {Object.values(GuestRoute).map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }

  function RegisterLayout(props) {
    return (
      <Layout {...props}>
        <Switch>
          {Object.values(RegisterRoute).map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
          <Redirect to={RoutePaths.UserProfile.replace(":id", "user-info")} />
        </Switch>
      </Layout>
    );
  }

  function ManagerLayout(props) {
    return (
      <Layout {...props}>
        <Switch>
          {Object.values(ManagerRoute).map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
          <Redirect to={RoutePaths.UserManager} />
        </Switch>
      </Layout>
    );
  }

  function AdminLayout(props) {
    return (
      <Layout {...props}>
        <Switch>
          {Object.values(RoutesApp).map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }

  function ManageRoute({ role = ROLE.GUEST }) {
    if (role === ROLE.REGISTER) {
      return (
        <Route key={1} path="/" render={(props) => <RegisterLayout {...props} />} />
      );
    } else if (role === ROLE.MANAGER) {
      return (
        <Route key={2} path="/" render={(props) => <ManagerLayout {...props} />} />
      );
    } else if (role === ROLE.ADMIN) {
      return (
        <Route key={3} path="/" render={(props) => <AdminLayout {...props} />} />
      );
    } else {
      return (
        <Route key={1} path="/" render={(props) => <GuestLayout {...props} />} />
      );
    }
  }

  return (
    <Router>
      {loggedIn ? (
        <Switch>
          <ManageRoute role={check} />
        </Switch>
      ) : (
        <Switch>
          <Route key={0} path="/" render={(props) => <GuestLayout {...props} />} />
        </Switch>

      )}
    </Router>
  );
}

export default App;