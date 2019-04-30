const initializeState = {
    userDetail:{
        username: 'temp',
        firstName: '',
        lastName: '',
        phone: '',
        avatar:'',
        birthday:''
    }
}

const userDetailReducer = (state = initializeState , action) =>{
    if(action.type === 'GET_USER') {
        let newState = Object.assign({} , state.userDetail);
        newState.username = action.value.username;
        newState.firstName = action.value.first_name;
        newState.lastName = action.value.last_name;
        newState.phone = action.value.phone;
        newState.avatar = action.value.avatar;
        newState.birthday = action.value.birthday
        return {
            ...state,
            userDetail: newState
        };
    }

    return state;
}

export default userDetailReducer;