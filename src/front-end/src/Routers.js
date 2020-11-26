import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './components/Error404';
import RegisterBeneficiary from './pages/RegisterBeneficiary';
import RegisterMedicineBenef from './pages/RegisterMedicineBenef';
import PrivateRoute from './PrivateRoute';
import ViewMedicinesRegister from './pages/ViewMedicinesRegister';

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register_user" component={RegisterBeneficiary} />
        <PrivateRoute
          exact
          path="/:beneficiary_id/view_medicine_register"
          component={ViewMedicinesRegister}
        />
        <PrivateRoute
          exact
          path="/:beneficiary_id/register_medicine_benef"
          component={RegisterMedicineBenef}
        />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
