import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Generate } from "../pages/Generate";
import { Success } from "../pages/Success";
import { Error } from "../pages/Error";
import NavBar from "../shared/NavBar";

const Layout = () => {
  return (
    <div className="content-wrapper z-depth-3">
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/success">Success</Link>
            </li>
            <li>
              <Link to="/error">Error</Link>
            </li>
          </ul>
        </nav> */}
        <NavBar></NavBar>
        <div className="wrapper">
          <Switch>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="/">
              <Generate />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
