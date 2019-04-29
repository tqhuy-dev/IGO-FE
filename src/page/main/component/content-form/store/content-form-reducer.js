import { localStorageUserKey } from "../../../../../share/constant";
import axios from 'axios';
import { enviroment } from './../../../../../core/enviroment';
const initializeState = {
    contentForm: {
        content: '',
        location: {
            name: '',
            country: '',
            checkin: []
        },
        tag: [],
        travel: [],
        type: 'Short-term vacation',
        range: {
            from: new Date(),
            to: new Date()
        },
        price: 0,
        hotels:[],
        images:[]
    },
    listContent:{
        data:[]
    }
}

const contentFormReducer = (state = initializeState, action) => {
    if (action.type === 'TYPE_CONTENT') {
        const newState = Object.assign({}, state);
        newState.contentForm.content = action.value;
        return newState;
    } else
    if (action.type === 'POST') {
        let username = JSON.parse(localStorage.getItem(localStorageUserKey)).data.username;
        let token =  JSON.parse(localStorage.getItem(localStorageUserKey)).token;
        let bodyContent = {
            username: username,
            content: state.contentForm.content,
            location: state.contentForm.location,
            tag: state.contentForm.tag,
            travel: state.contentForm.travel,
            type: state.contentForm.type,
            range: {
                from: (new Date(state.contentForm.range.from).getTime()).toString(),
                to: (new Date(state.contentForm.range.to).getTime()).toString(),
            },
            total_price: state.contentForm.price,
            hotel:state.contentForm.hotels,
            images: state.contentForm.images,
            metadata:{
                description:''
            }
        }
        axios.post(enviroment + 'contents' , bodyContent , {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((data) => {
            alert(data.data.message);
        })
        .catch(error =>{
            console.log(error);
        })
        window.location.reload();
    } else
    if(action.type === 'DELETE') {
        axios.delete(enviroment + 'contents/' + action.value , {
            headers:{
                Authorization : 'Bearer ' + JSON.parse(localStorage.getItem(localStorageUserKey)).token
            }
        })
        .then((result) => {
            alert(result.data.message);
        })
        .catch(error => {
            alert(error.message);
        })
        window.location.reload();
        return state;
    }else
    if (action.type === 'TYPE_LOCATION') {
        let dataLocation = action.active === 'ADD' ?
            action.value.target.value :
            action.value;

        let index = state.contentForm.location.checkin.findIndex(o => o.location === dataLocation);
        let location;
        if (action.active === 'ADD') {
            if (index >= 0) {
                return Object.assign({}, state);
            }

            location = {
                ...state.contentForm.location,
                checkin: state.contentForm.location.checkin.concat({
                    name: dataLocation,
                    rate: 5,
                    address: '',
                    images:[]
                })
            }
        } else {
            location = Object.assign({}, state.contentForm.location);
            location.checkin.splice(index, 1);
        }

        let newContentForm = {
            ...state.contentForm,
            location: location
        }


        return {
            ...state,
            contentForm: newContentForm
        }
    } else
    if (action.type === 'TYPE_COUNTRY') {
        const newState = Object.assign({}, state);
        newState.contentForm.location.country = action.value.country;
        newState.contentForm.location.name = action.value.name;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else
    if (action.type === 'TYPE_CITY') {
        const newState = Object.assign({}, state);
        newState.contentForm.location.name = action.value;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else
    if (action.type === 'TYPE_PRICE') {
        const newState = Object.assign({}, state);
        newState.contentForm.price = Number.parseInt(action.value);
        return newState;
    } else
    if (action.type === 'TYPE_RANGE') {
        let range;
        if (action.range === 'FROM') {
            range = {
                ...state.contentForm.range,
                from: action.value,
                to: action.value
            }
        } else
        if (action.range === 'TO') {
            range = {
                ...state.contentForm.range,
                to: action.value
            }
        }

        let newContentForm = {
            ...state.contentForm,
            range: range
        };

        return {
            ...state,
            contentForm: newContentForm
        }
    } else
    if (action.type === 'TYPE_VACATION') {
        const newState = Object.assign({}, state);
        newState.contentForm.type = action.value;
        return newState;
    } else
    if (action.type === 'TYPE_TRAVEL') {
        let newForm;
        let dataTravel = action.active === 'ADD' ? action.value.target.value : action.value;
        const index = state.contentForm.travel.findIndex(o => o.name === dataTravel);

        if (action.active === 'ADD') {
            if (index === -1) {
                newForm = {
                    ...state.contentForm,
                    travel: state.contentForm.travel.concat({
                        name: dataTravel
                    })
                };
            } else {
                return state;
            }
        } else {
            newForm = Object.assign({} , state.contentForm);
            newForm.travel.splice(index , 1);
        }
        return {
            ...state,
            contentForm: newForm
        }
    }else 
    if(action.type === 'GET_LIST_CONTENTS') {
        let listContentData = {
            ...state.listContent,
            data: action.value
        }
        return {
            ...state,
            listContent: listContentData
        };
    }
    return state;
}

export default contentFormReducer;