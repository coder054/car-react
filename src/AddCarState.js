import { extendObservable, computed } from 'mobx';

class AddCarState {
	constructor() {
		extendObservable(this, {
			name: ''		
		})
	}
}

export default AddCarState;