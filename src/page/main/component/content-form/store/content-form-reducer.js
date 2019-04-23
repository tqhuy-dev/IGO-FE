const initializeState = {
    contentForm:{
        content: '',
        location:{
            name: '',
            country:'',
            checkin:[]
        },
        tag: [],
        travel:[],
        type: '',
        range: {
            from: '',
            to: ''
        },
        price: 0
    }
}

const contentFormReducer = (state = initializeState , action) =>{
    if(action.type === 'TYPE_CONTENT') {
        const newState = Object.assign({} , state);
        newState.contentForm.content = action.value;
        return newState;
    } else
    if(action.type === 'POST') {
        const newState = Object.assign({} , state);
        console.log(newState);
        return newState;
    }else 
    if(action.type === 'TYPE_LOCATION') {
        const newState = Object.assign({} , state);
        newState.contentForm.location.checkin.push({
            location: action.value,
            rate: 5
        });
        return newState;
    } else
    if(action.type === 'TYPE_COUNTRY') {
        const newState = Object.assign({} , state);
        newState.contentForm.location.country = action.value.country;
        newState.contentForm.location.name = action.value.name;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else
    if(action.type === 'TYPE_CITY') {
        const newState = Object.assign({} , state);
        newState.contentForm.location.name = action.value;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else 
    if(action.type === 'TYPE_PRICE') {
        const newState = Object.assign({} , state);
        newState.contentForm.price = action.value;
        return newState;
    }
    return state;
}

export default contentFormReducer;