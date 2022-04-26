import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';// react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import { useSelector } from 'react-redux';

import './App.css'
import { publicRoutes, routes } from './constants'
import { history } from './redux/store';

function App() {

  const user = useSelector((state) => state.user.user)

  const loginLoading = useSelector((state) => state.user.loginLoading)

  const renderRouteItem = React.useCallback((routeArray) => (key) => {
    let route = routeArray[key];

    if (typeof route === 'function') {
      route = route();
    }

    const routeProps = {
      key: key,
      path: route.path,
      exact: route.exact,
    }

    const isBuiltComponent = React.isValidElement(route.component); //kiem tra tinh hop le reactComponent

    if (isBuiltComponent) {
      routeProps.children = route.component; //mo the
    } else {
      routeProps.component = route.component; //ten component
    }

    return (
      <Route
        {...routeProps}
      />
    )
  }, []);

  // if (loginLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  if (!user) {
    return (
      <ConnectedRouter history={history}>
        {/* <Redirect to="/" />
        <LoginPage /> */}
        <Switch>
          {Object.keys(publicRoutes).map(renderRouteItem(publicRoutes))}
          <Route path="*" >
            <Redirect to="/" />
          </Route>
        </Switch>
      </ConnectedRouter>
    )
  }

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {Object.keys(routes).map(renderRouteItem(routes))}
        <Route path="*" >
          <Redirect to="/" />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
