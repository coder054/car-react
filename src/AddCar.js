import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import logo from './logo.svg';
import loading from './loading.svg';
import priceLoading from './index.circle-dot-preloader.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Redirect } from 'react-router'

const AddCar = observer(class AddCar extends Component {
  componentDidMount = () => {

    const { AddCarState } = this.props;

    AddCarState.addSuccess = false

  }

  addCarSubmit = (event) => {
    const { AddCarState } = this.props
    const { car, createCar, Volume } = this.props.AddCarState
    event.preventDefault();

    if (!car.Ref || !car.model || !car.make || !car.FOB || isNaN(car.VehicleWidth)
      || isNaN(car.VehicleLength) || isNaN(car.VehicleHeight)
      || !car.VehicleLength || !car.VehicleHeight) {
      AddCarState.formValid = false
    } else {
      AddCarState.formValid = true
      createCar({ ...car, ...{ Volume } }) // merge car with {Volume: Volume}
    }


  }


  render = () => {

    const { AddCarState } = this.props;
    const { formValid, addSuccess, car } = this.props.AddCarState;
    return (
      <div className="App">

        <div className="container">
          <div className="title"> Add a Car</div>
          <div className="formaddcar-wrapper">
            <form onSubmit={this.addCarSubmit}>
              {
                !formValid ?
                  (
                    <div className="form-group text-danger">
                      Your data is not valid, please check again!
                </div>
                  ) :
                  (null)
              }
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.Ref = event.target.value} type="text" value={car.Ref} placeholder="ref" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.model = event.target.value} type="text" value={car.model} placeholder="model" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.make = event.target.value} type="text" value={car.make} placeholder="make" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.FOB = event.target.value} type="text" value={car.FOB} placeholder="FOB" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.VehicleWidth = event.target.value} type="text" value={car.VehicleWidth} placeholder="VehicleWidth" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.VehicleLength = event.target.value} type="text" value={car.VehicleLength} placeholder="VehicleLength" />
              </div>
              <div className="form-group">
                <input className="form-control" onChange={(event) => car.VehicleHeight = event.target.value} type="text" value={car.VehicleHeight} placeholder="VehicleHeight" />
              </div>

              <button className="btn btn-info" type="submit">
                Add Car
              </button>

              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
            </form>
          </div>
        </div>

        {
          addSuccess === true ?
            (
              <Redirect to="/" />
            ) :
            (null)
        }

      </div>
    );
  }
})

export default AddCar;