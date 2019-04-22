const initializeState = {
    country:[
    ],
    city:[],
    location:[]
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
    }
    return state;
}

export  default CityReducer;