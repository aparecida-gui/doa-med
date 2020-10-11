import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SearchMedicine from './components/SearchMedicine';
import Login from './components/Login';
import RegisterBeneficiary from './components/RegisterBeneficiary';
import RecordsOptions from './components/RecordsOptions';
import RegisterMedicineBenef from './components/RegisterMedicineBenef';
import ShowMedicineBeneficiary from './components/ShowMedicineBeneficiary';
import ViewMedicinesRegister from './components/ViewMedicinesRegister';
import Error404 from './components/Error404';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
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
          <Route component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
