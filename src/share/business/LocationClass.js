import axios from 'axios';
import { enviroment } from './../../core/enviroment';
class LocationClass {
    getDataCountry() {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        return new Promise((resolve , reject) =>{
            axios.get(enviroment + 'places/' , {headers : {
                Authorization: 'Bearer ' + token
            }})
            .then((data) =>{
              resolve(data.data.data);
            })
            .catch((error) =>{
            })
        })
    }

    getDataLocation(country) {
        
    }
}

export default LocationClass;