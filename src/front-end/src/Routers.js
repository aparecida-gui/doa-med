import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './components/Error404';
import RegisterBeneficiary from './pages/RegisterBeneficiary';
import RegisterMedicineBenef from './pages/RegisterMedicineBenef';
import PrivateRoute from './PrivateRoute';
import ViewMedicinesRegister from './pages/ViewMedicinesRegister';
import MedicineDonation from './pages/MedicineDonation';
import Home from './pages/Home';
import SearchMedicine from './pages/SearchMedicine';
import ContactDonor from './components/ContactDonor';

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register_user" component={RegisterBeneficiary} />
        <Route exact path="/search_medicine" component={SearchMedicine} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute
          exact
          path="/view_medicine_register/:beneficiary_id"
          component={ViewMedicinesRegister}
        />
        <PrivateRoute
          exact
          path="/register_medicine/:beneficiary_id"
          component={RegisterMedicineBenef}
        />
        <PrivateRoute exact path="/contact_donor" component={ContactDonor} />
        <PrivateRoute
          exact
          path="/medicine_donation/:beneficiary_id"
          component={MedicineDonation}
        />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
