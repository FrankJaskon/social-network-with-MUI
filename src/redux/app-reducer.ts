import { queryAuth } from './auth-reducer';

const SET_INITIALIZATION: 'unfriendly-network/app/SET-INITIALIZATION' = 'unfriendly-network/app/SET-INITIALIZATION',
    SET_SERVER_RESPONSE: 'unfriendly-network/app/SET-SERVER-RESPONSE' = 'unfriendly-network/app/SET-SERVER-RESPONSE',
    SET_TIMER_ID: 'unfriendly-network/app/SET-TIMER-ID' = 'unfriendly-network/app/SET-TIMER-ID',
    TOGGLE_THEME: 'unfriendly-network/TOGGLE-THEME' = 'unfriendly-network/TOGGLE-THEME';

const initialState = {
    initialized: true,
    responseWarning: null as null | string,
    timerId: null as null | number,
    isLightTheme: true,
};

export type InitialStateType = typeof initialState;

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    const type = action.type;

    switch (type) {
        case SET_INITIALIZATION:
        case SET_SERVER_RESPONSE:
        case SET_TIMER_ID:
        case TOGGLE_THEME:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setInitialization = (initialized: boolean) => ({type: SET_INITIALIZATION, payload: { initialized }});
export const setWarning = (responseWarning: string) => ({type: SET_SERVER_RESPONSE, payload: { responseWarning }});
export const setTimerId = (timerId: number | null) => ({type: SET_TIMER_ID, payload: { timerId }});
export const toggleTheme = (value: boolean) => ({type: TOGGLE_THEME, payload: { isLightTheme: value }});

type ActionsType = ReturnType<typeof setInitialization>
    | ReturnType<typeof setWarning>
    | ReturnType<typeof setTimerId>
    | ReturnType<typeof toggleTheme>;

export const initializeApp = () => async (dispatch: Function) => {
    await dispatch(queryAuth());

    dispatch(setInitialization(true));
}

export const setResponseWarning = (responseWarning: string) => (dispatch: Function, getState: Function) => {

    const id = getState().app.timerId;

    if (responseWarning && !getState().app.timerId) {
        dispatch(setWarning(responseWarning));
        dispatch(setTimerId(+(setTimeout(() => {
            dispatch(setWarning(''));
            clearTimeout(id);
            dispatch(setTimerId(null));
        }, 4000))));
    } else if (!responseWarning && getState().app.timerId) {
        dispatch(setWarning(responseWarning));
        clearTimeout(id);
        dispatch(setTimerId(null));
    }
}

export default appReducer;