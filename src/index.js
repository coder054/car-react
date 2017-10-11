import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/css/bootstrap.css';
import CarIndex from './CarIndex';
import AddCar from './AddCar';
import AddCarState from './AddCarState';
import registerServiceWorker from './registerServiceWorker';
import CarIndexState from './CarIndexState';
import CarDetail from './CarDetail';
import CarDetailState from './CarDetailState';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Switch } from 'react-router'

const Test = (a) => {
  console.log(a)
  return (
    <div className="test">
      Test
    </div>
  )
}


ReactDOM.render(
  <Router>
    <div className="root">
      <Switch>
        <Route exact path="/" render={(props) => <CarIndex CarIndexState={new CarIndexState()}> </CarIndex>}></Route >
        <Route exact path="/add-car" render={(props) => <AddCar {...props} AddCarState={new AddCarState()}></AddCar>}> </Route >
        <Route exact path="/cars/:id" render={(props) => <CarDetail {...props} CarDetailState={new CarDetailState()} > </CarDetail>} > </Route>
      </Switch>
    </div>

  </Router>,
  document.getElementById('root'));
registerServiceWorker();