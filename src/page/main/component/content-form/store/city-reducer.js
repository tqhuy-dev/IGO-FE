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
    }
    return state;
}

export  default CityReducer;