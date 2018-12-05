import * as React from 'react';
import {Redirect, Switch} from 'react-router';
import {Route, RouteComponentProps} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import LeftMenu from '../LeftMenu';
import Login from '../Login/index';
import RightContainer from '../RightContainer';
import {GlobalStyle} from '../styles/GlobalStyles';
import {NormalizeStyles} from '../styles/NormalizeStyles';
import {themeStyles} from '../styles/themeStyles';
import {MainApp} from './styles';

interface AppState {
    apiKey: string;
    isUserLogged: boolean;
    balance?: BalanceResponse;
    error?: any;
}

interface AppProps {
    [key: string]: any;
}

export interface BalanceResponse {
    amount: number;
    payment: string;
    type: string;
}

export default class App extends React.PureComponent<AppProps, AppState> {
    messagebird: any;

    constructor(props: AppProps) {
        super(props);

        this.setApiKey = this.setApiKey.bind(this);
        this.initMessagebird = this.initMessagebird.bind(this);
        this.removeApiKey = this.removeApiKey.bind(this);
        this.onExit = this.onExit.bind(this);
        this.state = {
            apiKey: '',
            isUserLogged: false
        };
    }

    onLogin(): void {
        this.setState(
            {
                isUserLogged: true
            },
            this.props.history.push('/sms')
        );
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
                    balance: balanceResponse
                });
                this.setApiKey(apiKey);
                this.onLogin();
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

    init(): void {
        const apiKey: string | null = localStorage.getItem('apiKey');

        if (apiKey) {
            this.initMessagebird(apiKey);
            this.onLogin();
        }
    }

    componentDidMount(): void {
        this.init();
    }

    render() {
        const {isUserLogged} = this.state;

        return (
            <ThemeProvider theme={themeStyles}>
                <MainApp id="main-app">
                    <NormalizeStyles />
                    <GlobalStyle />
                    <Switch>
                        <Route
                            path="/"
                            exact={true}
                            render={() => {
                                return isUserLogged ? (
                                    <Redirect to="/sms" />
                                ) : (
                                    <Login onKeyChange={this.initMessagebird} error={this.state.error} />
                                );
                            }}
                        />
                        <Route
                            path="/sms"
                            render={({match}: RouteComponentProps) => {
                                return isUserLogged ? (
                                    <>
                                        <LeftMenu onExit={this.onExit} />
                                        <RightContainer
                                            match={match}
                                            apiKey={this.state.apiKey}
                                            balance={this.state.balance}
                                            messagebird={this.messagebird}
                                        />
                                    </>
                                ) : (
                                    <Redirect to="/" />
                                );
                            }}
                        />
                        <Redirect from="*" to={isUserLogged ? '/sms' : '/'} />
                    </Switch>
                </MainApp>
            </ThemeProvider>
        );
    }
}
