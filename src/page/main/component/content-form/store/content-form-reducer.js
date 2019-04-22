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
        }
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
    }

    return state;
}

export default contentFormReducer;