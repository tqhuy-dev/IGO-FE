const initialState = {
    result: [10,20],
}

const ResultReducer = (state = initialState , action) =>{
    if(action.type === 'SAVE') {
       return {
           ...state,
           result: state.result.concat(20),//use concat instead of push because immutably
       }
    }

    return state;
}

export default ResultReducer;