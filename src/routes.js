// Router Dependencies
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import Container / Components for Routing
import ApplicationLayout from './js/components/ApplicationLayout';
import Main from './js/containers/Main';
import Score from './js/containers/Score';
import NotFound from './js/components/NotFound';

// Routes
export default (
  <Route path="/" component={ApplicationLayout}>
    <IndexRoute component={Main} />
    <Route path="score" component={Score} />
    <Route path="*" component={NotFound} />
  </Route>
);
