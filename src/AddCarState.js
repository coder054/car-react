import { extendObservable, computed, observable } from 'mobx';
import axios from 'axios';
import global from './global'


const API_URL = global.API_URL;
class AddCarState {
	constructor() {
		extendObservable(this, {
			car: {
				Ref: '',
				model: '',
				make: '',
				FOB: '',
				VehicleWidth: '',
				VehicleLength: '',
				VehicleHeight: '',
			},
			Volume: computed(() => this.car.VehicleWidth * this.car.VehicleLength * this.car.VehicleHeight),
			addSuccess: false,
			formValid: true,
		})
	}


	createCar = (car) => {
		axios.post(`${API_URL}/cars`, car)
			.then(resp => this.addSuccess = true)
			.catch(err => {
				console.log(err)
				this.addSuccess = false
			})
	}

}

export default AddCarState;