import React from 'react';
import { Route, Switch } from 'react-router-dom';// react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import { history } from './redux/store';
import './App.css'
import AppNavigationBar from './components/AppNavigationBar';
import { routes } from './constants'

function App() {

  const renderRouteItem = React.useCallback((key) => {
    let route = routes[key];

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
      <AppNavigationBar />
      <Switch>
        {Object.keys(routes).map(renderRouteItem)}
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
