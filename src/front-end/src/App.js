import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavDefault from './components/NavDefault';
import NavUser from './components/NavUser';
import SearchMedicine from './components/SearchMedicine';
import Login from './components/Login';
import RegisterBeneficiary from './components/RegisterBeneficiary';
import RecordsOptions from './components/RecordsOptions';
import RegisterMedicineBenef from './components/RegisterMedicineBenef';
import ShowMedicineBeneficiary from './components/ShowMedicineBeneficiary';
import ViewMedicinesRegister from './components/ViewMedicinesRegister';
import MedicineDonation from './components/MedicineDonation';
import Error404 from './components/Error404';

const App = () => {
  return (
    <BrowserRouter>
      <Route
        render={() => {
          return localStorage.getItem('tokenUser') ? (
            <NavUser />
          ) : (
            <NavDefault />
          );
        }}
      />
      <div className="container my-3 py-3">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/search_medicine" component={SearchMedicine} />
          <Route exact path="/record_options" component={RecordsOptions} />
          <Route exact path="/register_user" component={RegisterBeneficiary} />
          <Route
            exact
            path="/:beneficiary_id/view_medicine_register"
            component={ViewMedicinesRegister}
          />
          <Route
            exact
            path="/:beneficiary_id/register_medicine_benef"
            component={RegisterMedicineBenef}
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
          <Route component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
