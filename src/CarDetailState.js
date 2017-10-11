import { extendObservable, computed, observable } from 'mobx';
import axios from 'axios';
import global from './global'
import _ from 'lodash';


const API_URL = global.API_URL;
class CarDetailState {
  constructor() {
    extendObservable(this, {
      car: {},
      editing: { // if true will show cancel, false will show edit
        Ref: false, make: false,
        model: false, FOB: false, VehicleWidth: false,
        VehicleLength: false,
        VehicleHeight: false
      },

      carBackup: {}, // when user modified property then Cancel, take info from this to recover

      saveCarSuccess: false, // use this to show message about car creating success
      deleteCarSuccess: false, // use this to render <Redirect>
      atleastOnePropertyIsEditing: computed( // use this to show or not show save button
        () => {
          let x = false;
          for (let key in this.editing) {
            if (this.editing.hasOwnProperty(key)) {
              if (this.editing[key] === true) {
                x = true
              }
            }
          }
          return x;
        }
      )

    })
  }


  fetchCarById = (id) => {
    axios.get(`${API_URL}/cars/${id}`)
      .then(resp => {
        this.car = resp.data
        // set back up data
        this.carBackup = resp.data
      })
  }

  saveCar = () => {
    axios.patch(`${API_URL}/cars/${this.car._id}`, this.car)
      .then(resp => {

        // save success mean we no longer in editing mode
        this.editing = {
          Ref: false, make: false,
          model: false, FOB: false, VehicleWidth: false,
          VehicleLength: false,
          VehicleHeight: false
        }

        if (_.isEqual(this.car, this.carBackup)) {
          // if equal mean user did not change anything
        } else {

          this.saveCarSuccess = true
          this.carBackup = resp.data; // update backup data to newer version
        }

      })
  }

  deleteCar = () => {
    axios.delete(`${API_URL}/cars/${this.car._id}`)
      .then(resp => this.deleteCarSuccess = true)
  }
}

export default CarDetailState;