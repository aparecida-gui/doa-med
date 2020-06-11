import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SearchMedicine from './components/SearchMedicine';
import Login from './components/Login';
import Error404 from './components/Error404';
import RegisterBeneficiary from './components/RegisterBeneficiary';
import RecordsOptions from './components/RecordsOptions';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/search_medicine" component={SearchMedicine} />
          <Route exact path="/record_options" component={RecordsOptions} />
          <Route
            exact
            path="/register_beneficiary"
            component={RegisterBeneficiary}
          />
          <Route component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
