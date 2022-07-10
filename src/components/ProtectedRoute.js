import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function ProtecedRoute ({component: Component, ...props}) {
  return(
    <Route>
      {props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' />}
    </Route>
  )
}

export default ProtecedRoute;