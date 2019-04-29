const initializeState = {
    userDetail:{
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        avatar:''
    }
}

const userDetailReducer = (state = initializeState , action) =>{
    if(action.type === 'GET_USER') {
        let newState = Object.assign({} , state);
        newState.userDetail.username = action.value.username;
        newState.userDetail.firstName = action.value.first_name;
        newState.userDetail.lastName = action.value.last_name;
        newState.userDetail.phone = action.value.phone;
        newState.userDetail.avatar = action.value.avatar;
        return newState;
    }

    return state;
}

export default userDetailReducer;