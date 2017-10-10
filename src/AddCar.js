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
} from 'react-router'



const AddCar = observer(class AddCar extends Component {
  componentDidMount = () => {
    console.log(this.props)

  }

  addCarSubmit = (event) => {
    event.preventDefault();
  }


  render = () => {

    let { name } = this.props.AddCarState;
    return (
      <div className="App">

        <div className="container">
          <div className="title"> AddCarr </div>
          <div className="formaddcar-wrapper">
            <form onSubmit={this.addCarSubmit}>
              <input onChange={(event) => name = event.target.value} type="text" value={name} placeholder="name" />
              <button type="submit">
                AddCar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
})

export default AddCar;