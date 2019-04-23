const initializeState = {
    contentForm: {
        content: '',
        location: {
            name: '',
            country: '',
            checkin: []
        },
        tag: [],
        travel: [],
        type: '',
        range: {
            from: new Date(),
            to: new Date()
        },
        price: 0
    }
}

const contentFormReducer = (state = initializeState, action) => {
    if (action.type === 'TYPE_CONTENT') {
        const newState = Object.assign({}, state);
        newState.contentForm.content = action.value;
        return newState;
    } else
    if (action.type === 'POST') {
        const newState = Object.assign({}, state);
        console.log(newState);
        return newState;
    } else
    if (action.type === 'TYPE_LOCATION') {
        let dataLocation = action.active === 'ADD' ?
            action.value.target.value :
            action.value;

        let index = state.contentForm.location.checkin.findIndex(o => o.location === dataLocation);
        let location;
        if (action.active === 'ADD') {
            if (index >= 0) {
                return Object.assign({}, state);
            }

            location = {
                ...state.contentForm.location,
                checkin: state.contentForm.location.checkin.concat({
                    location: dataLocation,
                    rate: 5
                })
            }
        } else {
            location = Object.assign({}, state.contentForm.location);
            location.checkin.splice(index, 1);
        }

        let newContentForm = {
            ...state.contentForm,
            location: location
        }


        return {
            ...state,
            contentForm: newContentForm
        }
    } else
    if (action.type === 'TYPE_COUNTRY') {
        const newState = Object.assign({}, state);
        newState.contentForm.location.country = action.value.country;
        newState.contentForm.location.name = action.value.name;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else
    if (action.type === 'TYPE_CITY') {
        const newState = Object.assign({}, state);
        newState.contentForm.location.name = action.value;
        newState.contentForm.location.checkin.length = 0;
        return newState;
    } else
    if (action.type === 'TYPE_PRICE') {
        const newState = Object.assign({}, state);
        newState.contentForm.price = Number.parseInt(action.value);
        return newState;
    } else
    if (action.type === 'TYPE_RANGE') {
        let range;
        if (action.range === 'FROM') {
            range = {
                ...state.contentForm.range,
                from: action.value,
                to: action.value
            }
        } else
        if (action.range === 'TO') {
            range = {
                ...state.contentForm.range,
                to: action.value
            }
        }

        let newContentForm = {
            ...state.contentForm,
            range: range
        };

        return {
            ...state,
            contentForm: newContentForm
        }
    }else
    if( action.type === 'TYPE_VACATION') {
        const newState = Object.assign({} , state);
        newState.contentForm.type = action.value;
        return newState;
    }else
    if( action.type === 'TYPE_TRAVEL') {
        let newForm = {
            ...state.contentForm,
            travel: state.contentForm.travel.concat({
                name:action.value
            })
        };

        return {
            ...state,
            contentForm: newForm
        }
    }
    return state;
}

export default contentFormReducer;