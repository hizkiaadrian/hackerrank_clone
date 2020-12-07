import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = () => (
  <div className="page-not-found">
    <h2>404 Page Not Found</h2>
    <Link to="/">Home</Link>
  </div>
)

export default PageNotFound;