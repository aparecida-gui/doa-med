import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './components/Error404';
import RegisterBeneficiary from './pages/RegisterBeneficiary';
import RegisterMedicineBenef from './pages/RegisterMedicineBenef';
import PrivateRoute from './PrivateRoute';
import ViewMedicinesRegister from './pages/ViewMedicinesRegister';
import MedicineDonation from './components/MedicineDonation';

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register_user" component={RegisterBeneficiary} />
        <PrivateRoute
          exact
          path="/:beneficiary_id/view_medicine_register"
          component={ViewMedicinesRegister}
        />
        <PrivateRoute
          exact
          path="/register_medicine/:beneficiary_id"
          component={RegisterMedicineBenef}
        />
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
