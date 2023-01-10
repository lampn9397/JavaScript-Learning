import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';// react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import { history } from './redux/store';
import { publicRoutes } from './constants'

function App() {
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

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {Object.keys(publicRoutes).map(renderRouteItem(publicRoutes))}
        <Route path="*" >
          <Redirect to="/" />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
