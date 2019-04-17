const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {
    if(action.type === 'INCREMENT') {
        return {
            ...state,
            counter: state.counter + 1
        }
    } else 
    if(action.type === 'DESCREMENT') {
        const newState = Object.assign({} , state);
        newState.counter = state.counter - action.number;
        return newState;  
    } 
    else 
    if( action.type === 'MULTI') {
        const newState = Object.assign({} , state);
        newState.counter = state.counter * action.number;
        return newState;
    }
    return state;
}

export default reducer;