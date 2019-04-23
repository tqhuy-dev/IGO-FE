const initializeState = {
    country:[
    ],
    city:[],
    location:[],
    typeVacation:[],
    travelMovement: []
};

const CityReducer = (state = initializeState , action) =>{
    if(action.type === 'GET_COUNTRY') {
        const newState = Object.assign({} , state); 
        newState.country = action.value;
        return newState;
    } else 
    if(action.type === 'GET_CITY') {
        const newState = Object.assign({} , state);
        newState.city = action.value;
        return newState;
    } else 
    if( action.type === 'GET_LOCATION') {
       return {
           ...state,
           location: action.value
       }
    }else
    if(action.type === 'GET_VACATION_TYPES') {
        return {
            ...state,
            typeVacation: action.value
        }
    }else
    if(action.type === 'GET_TRAVEL') {
        return {
            ...state,
            travelMovement: action.value
        }
    }
    return state;
}

export  default CityReducer;