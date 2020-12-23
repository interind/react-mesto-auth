import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ children, loggedIn }) => {
  return (
    <Route>
      {() =>
        loggedIn ? <React.Fragment>{children}</React.Fragment> : <Redirect to='/login' />
      }
    </Route>
  );
};

export default withRouter(ProtectedRoute);
