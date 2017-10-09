import { extendObservable, computed } from 'mobx';
import axios from 'axios';
import _ from 'lodash';


const API_URL = 'http://localhost:4000/api';


class AppState {
	constructor() {
		extendObservable(this, {
			cars: [],
			port: '',
			country: '',
			keyword: '',
			countries: [],
			ports: [],
			fetchCarsFinished: false,
			showSelectPort: false,
			carsSortByModelASC: computed(() => _.orderBy(this.cars, ['model'], ['asc'])),
			carsSortByModelDESC: computed(() => _.orderBy(this.cars, ['model'], ['desc']))
		})
	}

	sortASC = () => {

		this.cars = this.carsSortByModelASC;
	}

	sortDESC = () => {

		this.cars = this.carsSortByModelDESC;
	}



	fetchCars = () => {
		this.fetchCarsFinished = false;
		axios.get(`${API_URL}/cars?country=${this.country}&port=${this.port}&keyword=${this.keyword}`)
			.then(resp => {
				this.cars = resp.data[1]
				this.fetchCarsFinished = true;
			})
	}


	fetchCountries = () => {
		axios.get(`${API_URL}/countries`)
			.then(resp => {
				this.countries = resp.data;
			})
	}

	fetchPortsByCountry = () => {
		axios.get(`${API_URL}/portByCountry/${this.country}`)
			.then(resp => {
				this.ports = resp.data
			})
	}


	chooseCountry = (country) => {
		this.showSelectPort = true;
		this.country = country;
		this.port = '';
		this.fetchPortsByCountry();

	}

	choosePort = (port) => {
		this.fetchCarsFinished = false;
		this.port = port;
		this.fetchCars();
	}


	onKeywordChange = (keyword) => {
		this.keyword = keyword;
	}

	setKeyword = (keyword) => {
		this.keyword = keyword
	}

}

export default AppState;