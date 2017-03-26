import React from 'react';
import { Router, Route } from 'react-router';
import Html from './components/Html';
import Home from './pages/Home';
import Foo from './pages/Foo';
import Bar from './pages/Bar';
import NotFound from './pages/NotFound';

export default (
    <Router>
        <Route component={Html}>
            <Route path='/' component={Home}/>
            <Route path='/foo' component={Foo} />
            <Route path='/bar' component={Bar} />
            <Route path='*' component={NotFound} />
        </Route>
    </Router>
);
