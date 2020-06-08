import React from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import SearchMedicine from './components/SearchMedicine';
import Error404 from './components/Error404';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="#">
          DoaMed
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="#">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                Link
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/search_medicine"
                tabindex="-1"
                aria-disabled="true"
              >
                Pesquisar Medicamentos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route exact path="/search_medicine" component={SearchMedicine} />
          <Route component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
