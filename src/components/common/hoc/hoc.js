import React, {Suspense} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux';
import ErrorPage from '../error/error-page';

const mapStateToPropsForRedirect= ({auth: {isAuth}}) => ({isAuth});

const HOC = {
    redirectAuthWrapperComponent(Component) {
        class ContainerComponent extends React.Component {
            render() {
                const {isAuth} = this.props;

                if (!isAuth) return <Redirect to={'/login'} />
                else return <Component {...this.props} />;
            }
        }
        return connect(mapStateToPropsForRedirect, {})(ContainerComponent);
    },
    redirectProfileWrapperComponent(Component) {
        class ContainerComponent extends React.Component {
            render() {
                const {isAuth} = this.props;

                if (isAuth) return <Redirect to={'/profile'} />
                else return <Component {...this.props} />;
            }
        }
        return connect(mapStateToPropsForRedirect, {})(ContainerComponent);
    },
    showPageErrorWrapperComponent(Component) {
        class ContainerComponent extends React.Component {
            componentDidUpdate(prevProps) {
                if (prevProps.match.url !== this.props.match.url) {
                    this.props.setLoadingError('', '');
                }
            }
            componentWillUnmount() {
                this.props.setLoadingError('', '');
            }
            render() {
                const {loadingError} = this.props;

                if (loadingError.code) return <ErrorPage loadingError={loadingError} />
                else return <Component {...this.props} />;
            }
        }
        return connect(mapStateToPropsForRedirect, {})(ContainerComponent);
    },
    wrapComponentSuspense(Component, Preloader) {
        const NewComponent = (props) => {
            return <Suspense fallback={Preloader}>
                <Component {...props} />
            </Suspense>
        }
        return NewComponent;
    }
}

export default HOC;
