import * as React from 'react';
import {Redirect, Switch} from 'react-router';
import {Route, RouteComponentProps} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import FirebaseMessaging, {FirebaseState} from '../../FirebaseMessaging';
import Login from '../Login/index';
import Messenger from '../Messenger/index';
import {GlobalStyle} from '../styles/GlobalStyles';
import {NormalizeStyles} from '../styles/NormalizeStyles';
import {themeStyles} from '../styles/themeStyles';
import {MainApp} from './styles';

interface AppState extends FirebaseState {
    apiKey: string;
    isUserLogged: boolean;
    balance?: BalanceResponse;
    error?: any;
    isOffline: boolean;
    tokenValue: string;
    isRegistered: boolean;
}

interface AppProps {
    [key: string]: any;
}

export interface BalanceResponse {
    amount: number;
    payment: string;
    type: string;
}

export default class App extends FirebaseMessaging<AppProps, AppState> {
    messagebird: any;
    state = {
        apiKey: '',
        isUserLogged: false,
        isOffline: !navigator.onLine,
        tokenValue: '',
        isRegistered: false,
        balance: undefined,
        error: undefined
    };

    constructor(props: AppProps) {
        super(props);
        this.initializeFirebaseApp('607900386765');
        this.initMessaging();
        this.initFirebase();
        this.onRegistration = this.onRegistration.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setOfflineStatus = this.setOfflineStatus.bind(this);
        this.setApiKey = this.setApiKey.bind(this);
        this.initMessagebird = this.initMessagebird.bind(this);
        this.removeApiKey = this.removeApiKey.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    setOfflineStatus() {
        this.setState({
            isOffline: !navigator.onLine
        });
    }

    onExit(): void {
        this.removeApiKey();
        this.setState(
            {
                isUserLogged: false
            },
            this.props.history.push('/')
        );
    }

    initMessagebird(apiKey: string): void {
        const messagebird: any = require('messagebird')(apiKey);

        messagebird.balance.read(
            (error: any, balanceResponse: BalanceResponse): void => {
                if (error) {
                    this.setState({
                        error: error
                    });
                    return;
                }
                this.messagebird = messagebird;
                this.setState({
                    balance: balanceResponse,
                    isUserLogged: true
                });
                this.setApiKey(apiKey);
            }
        );
    }

    setApiKey(apiKey: string): void {
        localStorage.setItem('apiKey', apiKey);
        this.setState({
            apiKey
        });
    }

    removeApiKey(): void {
        localStorage.removeItem('apiKey');
        this.setState({
            apiKey: ''
        });
    }

    onLogin(apiKey: string) {
        this.initMessagebird(apiKey);
        this.props.history.push('/messenger');
    }

    init(): void {
        const apiKey: string | null = localStorage.getItem('apiKey');

        if (apiKey) {
            this.setState({
                apiKey,
                isUserLogged: true
            });
            this.initMessagebird(apiKey);
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log('error', error);
        console.log('errorInfo', errorInfo);
    }

    componentDidMount(): void {
        this.init();
        window.addEventListener('online', this.setOfflineStatus);
        window.addEventListener('offline', this.setOfflineStatus);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.setOfflineStatus);
        window.removeEventListener('offline', this.setOfflineStatus);
    }

    render() {
        return (
            <ThemeProvider theme={themeStyles}>
                <MainApp id="main-app">
                    <NormalizeStyles />
                    <GlobalStyle />
                    <Switch>
                        <Route
                            path="/messenger/:filter?"
                            render={({match}: RouteComponentProps) => {
                                return (
                                    <Messenger
                                        resetUI={this.resetUI}
                                        onExit={this.onExit}
                                        match={match}
                                        isOffline={this.state.isOffline}
                                        apiKey={this.state.apiKey}
                                        balance={this.state.balance}
                                        messagebird={this.messagebird}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/"
                            exact={true}
                            render={() =>
                                !this.state.isUserLogged ? (
                                    <Login onKeyChange={this.onLogin} error={this.state.error} />
                                ) : (
                                    <Redirect to="/messenger" />
                                )
                            }
                        />
                    </Switch>
                </MainApp>
            </ThemeProvider>
        );
    }
}
