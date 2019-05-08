const initializeState = {
    listFriend:[]
};

const FriendStore = ( state = initializeState , action) =>{
    if(action.type === 'GET_FRIEND') {
        return {
            ...state,
            listFriend: action.value
        }
    }
    return state;
} 

export default FriendStore;