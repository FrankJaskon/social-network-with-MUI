import {queryAuth} from './auth-reducer';

const SET_INITIALIZATION = 'unfriendly-network/app/SET-INITIALIZATION';

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    const type = action.type;

    switch (type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialized: action.initialized
            }
        default:
            return state;
    }
}

export const setInitialization = (value) => ({type: SET_INITIALIZATION, initialized: value});

export const initializeApp = () => async (dispatch) => {
    await dispatch(queryAuth());
    await dispatch(setInitialization(true));

}

export default appReducer;