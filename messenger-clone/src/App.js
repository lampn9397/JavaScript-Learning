import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';// react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as ActionTypes from './redux/actionTypes'

import styles from './App.module.css'
import { publicRoutes, routes } from './constants'
import { history } from './redux/store';
import AppNavigationBar from './components/AppNavigationBar';

function App() {

  const user = useSelector((state) => state.user.user)

  const loginLoading = useSelector((state) => state.user.loginLoading)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: ActionTypes.CHECK_LOGIN });
  }, [dispatch])

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

  if (loginLoading) {
    return (
      <Box className={styles.loginLoading}>
        <CircularProgress />
      </Box>
    )
  }

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
      <AppNavigationBar />
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
