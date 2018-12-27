import * as React from 'react';
import {Redirect, Switch} from 'react-router';
import {Route, RouteComponentProps} from 'react-router-dom';
import * as socketIOClient from 'socket.io-client';
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
    socket: SocketIOClient.Socket | undefined;
    messagebird: any;

    constructor(props: AppProps) {
        super(props);
        this.socket = undefined;
        this.initMessaging();
        this.initFirebase();
        this.init();
        this.onRequestPermission = this.onRequestPermission.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.setOfflineStatus = this.setOfflineStatus.bind(this);
        this.setApiKey = this.setApiKey.bind(this);
        this.initMessagebird = this.initMessagebird.bind(this);
        this.removeApiKey = this.removeApiKey.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            apiKey: this.getApiKey(),
            isOffline: !navigator.onLine,
            tokenValue: '',
            isRegistered: false,
            balance: undefined,
            error: undefined
        };
    }

    setOfflineStatus() {
        this.setState({
            isOffline: !navigator.onLine
        });
    }

    onExit(): void {
        this.removeApiKey();
        this.props.history.push('/');
        if (this.socket) {
            this.socket.disconnect();
        }
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
                    balance: balanceResponse
                });
                this.setApiKey(apiKey);
                this.socket = socketIOClient({host: process.env.WEBHOOK_URL});
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

    getApiKey() {
        return localStorage.getItem('apiKey') || '';
    }

    init(): void {
        const apiKey: string = this.getApiKey();

        if (apiKey) {
            this.setState({
                apiKey
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
        if (this.socket) {
            this.socket.disconnect();
        }
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
                            render={({match}: RouteComponentProps) =>
                                this.state.apiKey ? (
                                    <Messenger
                                        socket={this.socket}
                                        error={this.error}
                                        onSubmit={this.onSubmit}
                                        sendNotification={this.sendNotification}
                                        onRequestPermission={this.onRequestPermission}
                                        onDelete={this.onDelete}
                                        resetUI={this.resetUI}
                                        onExit={this.onExit}
                                        match={match}
                                        isOffline={this.state.isOffline}
                                        apiKey={this.state.apiKey}
                                        balance={this.state.balance}
                                        messagebird={this.messagebird}
                                    />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route
                            path="/"
                            exact={true}
                            render={() =>
                                !this.state.apiKey ? (
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
