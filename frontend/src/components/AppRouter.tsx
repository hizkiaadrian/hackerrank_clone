import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '../configs/routes';

function AppRouter() {
    return (
        <Router>
            <Switch>
                {routes.map(route => (
                    <Route 
                        key={route.path} 
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                    ))
                }            
            </Switch>
        </Router>
    )
}

export default AppRouter;
