import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preloader from '../common/preloader';
import DialogsContainer from '../dialogs';
import ProfileContainer from '../profile';
import UsersContainer from '../users';
import LoginContainer from '../login';
import SettingsContainer from '../settings';
import WarningField from '../common/warning-field';
import { initializeApp, setResponseWarning } from '../../redux/app-reducer';
import NavigationBars from '../navigation-bars';
import { RootStateType, StoreType } from '../../redux/redux-store';
import { ThemeProvider } from '@mui/material/styles';

import s from './App.module.sass';
import { darkTheme, primaryTheme } from '../context/themeContext/themeContext';

const App = () => {

    const dispatch = useDispatch();
    const { initialized, responseWarning, isLightTheme } = useSelector((state: RootStateType) => state.app);

    useEffect(() => {
        dispatch(initializeApp());

        window.addEventListener("unhandledrejection", ({reason: {response: {data: {message}}}}) => {
            message && dispatch(setResponseWarning(message));
        });
    }, [dispatch]);

    if (!initialized) {
        return (
            <Preloader preloaderClass={s.preloader}/>
        )
    }
    return (
        <ThemeProvider theme={isLightTheme ? primaryTheme : darkTheme}>
            <div className={isLightTheme ? s.lightTheme : s.darkTheme}>
                <div className={s.wrapper}>
                    <NavigationBars>
                        <div className={s['app-wrapper-content']}>
                            <WarningField hideFieldFunction={setResponseWarning} filedStyle={s.warningField}>
                                {responseWarning}
                            </WarningField>
                            <Routes>
                                <Route
                                    path="/login"
                                    element={ <LoginContainer /> } />
                                <Route
                                    path='/profile/:userId'
                                    element={ <ProfileContainer /> } />
                                <Route
                                    path='/profile'
                                    element={ <ProfileContainer /> } />
                                <Route
                                    path='/dialogs'
                                    element={ <DialogsContainer /> } />
                                <Route
                                    path='/users/'
                                    // @ts-ignore
                                    element={ <UsersContainer /> } />
                                <Route
                                    path='/settings'
                                    element={ <SettingsContainer /> } />
                                <Route
                                    path="*"
                                    element={ <ProfileContainer /> } />
                            </Routes>
                        </div>
                    </NavigationBars>
                </div>
            </div>
        </ThemeProvider>
    )
}

interface PropType {
    store: StoreType
}

const UnfriendlySocialNetworkApp = ({ store }: PropType) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default UnfriendlySocialNetworkApp;
