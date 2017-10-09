import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import logo from './logo.svg';
import loading from './loading.svg';
import priceLoading from './index.circle-dot-preloader.svg';
import './App.css';



const App = observer(class App extends Component {
    componentDidMount = () => {
        this.props.appState.fetchCars()
        this.props.appState.fetchCountries()
    }


    renderPrice = (car) => {
        const { port, fetchCarsFinished } = this.props.appState;
        if (car.finalPrice && port && fetchCarsFinished) {
            return car.finalPrice;
        } else if (port && !fetchCarsFinished) {
            return (<img src={priceLoading} className="priceLoading" alt=" " />)
        } else {
            return '---';
        }
    }



    renderTableBody = () => {
        const { cars, fetchCarsFinished } = this.props.appState;

        if (cars.length === 0 && fetchCarsFinished) {
            return (
                <div> No car found! </div>
            )
        } else if (!fetchCarsFinished && cars.length === 0) {
            return (
                <tbody>
                    <tr>
                        <img src={loading} className="loadingcars" alt="" />
                    </tr>
                </tbody>
            )
        } else {
            return (
                <tbody>
                    {
                        cars.slice().map((val, key) =>
                            <tr key={key}>
                                <td> {val.make} </td>
                                <td> {val.model} </td>
                                <td> {val.FOB} </td>
                                <td>
                                    {this.renderPrice(val)}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            )
        }
    }


    handleSearch = (event) => {
        event.preventDefault();
        const { fetchCars } = this.props.appState;
        fetchCars();

    }

    renderCarsTable = () => {
        const { onKeywordChange, keyword, countries, chooseCountry, country, port, choosePort, ports, sortASC, sortDESC, showSelectPort } = this.props.appState

        return (
            <div>
                <div className="chooseCountryPort">
                    <div>
                        <span> Choose a Country: </span>
                        <select value={country} onChange={(event) => chooseCountry(event.target.value)}>
                            <option value=''> --- </option>
                            {
                                countries.length ?
                                    (
                                        countries.map((val, key) =>
                                            <option key={key} value={val}> {val} </option>
                                        )
                                    ) :
                                    (
                                        null
                                    )
                            }

                        </select>
                    </div>

                    {
                        showSelectPort ?
                            (
                                <div className="selectPort">
                                    <span> Then choose a Port: </span>

                                    <select value={port} onChange={(event) => choosePort(event.target.value)}>
                                        <option value=''> --- </option>
                                        {
                                            ports.length ?
                                                (
                                                    ports.map((val, key) =>
                                                        <option key={key} value={val.name}> {val.name} </option>
                                                    )
                                                ) :
                                                (
                                                    null
                                                )
                                        }
                                    </select>
                                </div>
                            ) :
                            (null)
                    }


                    <div>
                        <span> Search by model: </span>
                        <form onSubmit={this.handleSearch}>
                            <input value={keyword} type="search" onChange={(event) => onKeywordChange(event.target.value)} />
                            <input type="submit" value="Search" />
                        </form>

                    </div>
                </div>

                <div className="addCarWrapper">
                    <div className="btn btn-info">
                        Add Car
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model
                                <span onClick={() => sortDESC()} className="glyphicon glyphicon-triangle-bottom"></span>
                                <span onClick={() => sortASC()} className="glyphicon glyphicon-triangle-top"></span>

                            </th>
                            <th>Fob (USD) </th>
                            <th className="priceColumn"> Price (USD) </th>
                        </tr>
                    </thead>

                    {this.renderTableBody()}


                </table>

            </div>

        )
    }

    render = () => {

        return (
            <div className="App">

                <div className="container">
                    <div className="title"> Cars </div>
                    {this.renderCarsTable()}

                </div>
            </div>
        );
    }
})

export default App;