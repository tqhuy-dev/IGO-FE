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

    getDataCity(country) {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        return new Promise((resolve , reject) =>{
            axios.get(enviroment + 'places/' + country , {headers : {
                Authorization: 'Bearer ' + token
            }})
            .then((data) =>{
                if(data.data.status === 200) {
                    resolve(data.data.data);
                } else {
                    resolve([]);
                }
            })
            .catch((error) =>{
                console.log(error);
            })
        })
    }

    getDataLocation(city) {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        return new Promise((resolve , reject) =>{
            axios.get(enviroment + 'places/locations/' + city ,{headers : {
                Authorization: 'Bearer ' + token
            }})
            .then((data) =>{
                if(data.data.status === 200) {
                    resolve(data.data.data);
                } else {
                    resolve([]);
                }
            })
            .catch((error) =>{
                console.log(error);
            })
        })
    }
}

export default LocationClass;