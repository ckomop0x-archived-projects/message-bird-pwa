import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Redirect, Switch} from 'react-router';
import {Route, RouteComponentProps} from 'react-router-dom';
import Login from '../Login/index';
import {GlobalStyle} from '../styles/GlobalStyles';
import {NormalizeStyles} from '../styles/NormalizeStyles';
import {themeStyles} from '../styles/themeStyles';
import {Container} from './styles';
import LeftMenu from '../LeftMenu';
import RightContainer from '../RightContainer';

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

    onLogin() {
        this.setState(
            {
                isUserLogged: true
            },
            this.props.history.push('/sms')
        );
    }

    onExit() {
        this.removeApiKey();
        this.setState(
            {
                isUserLogged: false
            },
            this.props.history.push('/')
        );
        console.log('onExit');
    }

    initMessagebird(apiKey: string) {
        const messagebird = require('messagebird')(apiKey);

        messagebird.balance.read((error: any, balanceResponse: BalanceResponse) => {
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
        });
    }

    setApiKey(apiKey: string) {
        localStorage.setItem('apiKey', apiKey);
        this.setState({
            apiKey
        });
    }

    removeApiKey() {
        localStorage.removeItem('apiKey');
        this.setState({
            apiKey: ''
        });
    }

    init() {
        const apiKey = localStorage.getItem('apiKey');

        if (apiKey) {
            this.initMessagebird(apiKey);
            this.onLogin();
        }
    }

    componentDidMount() {
        this.init();
    }

    render() {
        const {isUserLogged} = this.state;

        return (
            <ThemeProvider theme={themeStyles}>
                <Container id="main-app">
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
                </Container>
            </ThemeProvider>
        );
    }
}
