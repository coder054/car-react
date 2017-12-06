import React, { Component } from "react";
import { observer } from "mobx-react";
// import logo from './logo.svg';

import carInfoLoading from "./Spinner.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Switch, Redirect } from "react-router";

const CarInfoo = observer(
    class CarInfoo extends Component {
        renderEdit = () => {

            const { property, car, CarDetailState } = this.props;


            // Don't show "Edit" with Volume property
            if (property == "Volume") {
                return null
            } else {
                return (
                    <div onClick={() => {
                        CarDetailState.saveCarSuccess = false;
                        CarDetailState.editing[property] = true;
                    }} className="editinfo">
                        Edit
                    </div>
                )
            }
        }

        render = () => {
            const { property, label, car, CarDetailState } = this.props;

            return (
                <div className="carinfo">
                    {
                        CarDetailState.editing[property] ?
                            (
                                <div onClick={
                                    () => {
                                        CarDetailState.car[property] =
                                            CarDetailState.carBackup[property];
                                        CarDetailState.editing[property] = false;
                                    }
                                }
                                    className="editinfo" >
                                    Cancel </div>
                            ) : this.renderEdit() // xxxx
                    }

                    <span className="labelCarProperty" > {label} </span>
                    {
                        CarDetailState.editing[property] ?
                            (
                                <input className="form-control carpropinput"
                                    onChange={event => (CarDetailState.car[property] = event.target.value)}
                                    type="text" value={car[property]} />
                            ) : (
                                <span>
                                    {!car[property] ?
                                        (
                                            <img src={carInfoLoading} className="carInfoLoading" alt=" " />
                                        ) :
                                        (car[property])
                                    }
                                </span>
                            )
                    } </div>
            );
        };
    }
);

const CarDetail = observer(
    class CarDetail extends Component {
        componentDidMount = () => {
            const { id } = this.props.match.params;
            const { fetchCarById } = this.props.CarDetailState;
            fetchCarById(id);
        };

        render = () => {
            const { deleteCarSuccess, car, atleastOnePropertyIsEditing, saveCar, saveCarSuccess, deleteCar } = this.props.CarDetailState;

            return (
                <div className="CarDetailRoott" >
                    {deleteCarSuccess ? < Redirect to="/" /> : null}


                    {
                        saveCarSuccess ? (<div className="alert alert-success" >
                            <strong> Save Car Successfully! </strong> </div>
                        ) : null
                    }

                    <div className="container cardetail" >
                        <div className="title" > Car Detail: </div>

                        <button onClick={e => { deleteCar() }} className="delete btn btn-danger" >
                            Delete
                        </button>

                        <Link to="/" className="backtoIndex btn btn-info">
                            Back </Link>

                        <div className="carDetail" >
                            <CarInfoo label="Ref" property="Ref" car={car} {...this.props } />
                            <CarInfoo label="make" property="make" car={car} {...this.props } />
                            <CarInfoo label="model" property="model" car={car} {...this.props } />
                            <CarInfoo label="FOB" property="FOB" car={car} {...this.props } />
                            <CarInfoo label="VehicleWidth" property="VehicleWidth" car={car} {...this.props } />
                            <CarInfoo label="VehicleLength" property="VehicleLength" car={car} {...this.props } />
                            <CarInfoo label="VehicleHeight" property="VehicleHeight" car={car} {...this.props } />
                            <CarInfoo label="Volume" property="Volume" car={car} {...this.props } />
                        </div>

                        {
                            atleastOnePropertyIsEditing ?
                                (
                                    <div onClick={() => { saveCar() }} className="savecar btn btn-primary" >Save </div>
                                ) : null
                        }
                    </div>

                </div>
            );
        };
    }
);

export default CarDetail;