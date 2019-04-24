const initializeState = {
    listContent:[]
};

const ListContentReducer = (state = initializeState , action) =>{
    if(action.type === 'GET_LIST_CONTENTS') {
        const newState = Object.assign({} , state);
        newState.listContent = action.value;
        return newState;
    }
    return state;
}
export default ListContentReducer;