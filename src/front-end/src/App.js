import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavDefault from './components/NavDefault';
import SearchMedicine from './components/SearchMedicine';
import Login from './components/Login';
import RegisterBeneficiary from './components/RegisterBeneficiary';
import ShowMedicineBeneficiary from './components/ShowMedicineBeneficiary';
import MedicineDonation from './components/MedicineDonation';
import MainPage from './pages/main';
import Error404 from './components/Error404';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <NavDefault />
        <div className="container my-3 py-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/search_medicine" component={SearchMedicine} />
            <Route
              exact
              path="/register_user"
              component={RegisterBeneficiary}
            />
            <Route
              exact
              path="/show_medicine_benef"
              component={ShowMedicineBeneficiary}
            />
            <Route
              exact
              path="/register_medicine/donantion"
              component={MedicineDonation}
            />
            <Route component={MainPage} />
            <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
