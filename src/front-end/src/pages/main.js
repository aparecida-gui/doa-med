import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewMedicinesRegister from '../components/ViewMedicinesRegister';
import RegisterMedicineBenef from '../components/RegisterMedicineBenef';
import Error404 from '../components/Error404';

export default function MainPage() {
  return (
    <Fragment>
      <Switch>
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
        <Route component={Error404} />
      </Switch>
    </Fragment>
  );
}
