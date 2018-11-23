import * as React from 'react';
import {BigLogo, LoginStyled} from './styles';

interface LoginProps {
    error?: Error;
    onKeyChange(apiKey: string): void;
}

interface LoginState {
    apiKey: string;
}

export default class Login extends React.PureComponent<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            apiKey: ''
        };
    }

    private onChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value} = element;

        this.setState({
            apiKey: value
        });
    }

    private onFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
        const {apiKey} = this.state;
        event.preventDefault();

        if (apiKey) {
            this.props.onKeyChange(apiKey);
        }
    }

    render() {
        return (
            <LoginStyled>
                <div className="skewed-background" />
                <BigLogo title="Message Bird Application">
                    <img src={require('../../../../icons/big-logo.svg')} alt="Logo" />
                </BigLogo>
                <div className="sign-up-box">
                    <section className="content col-md-12">
                        <h1 className="signup-heading">Welcome back!</h1>
                        <p className="signup-description">
                            No account yet? <a href="https://dashboard.messagebird.com/en/sign-up">Sign up for free</a>
                        </p>
                    </section>
                    <div className="text-on-line-col">
                        <span className="text-on-line">or</span>
                    </div>
                    <section className="form content padded-bottom ">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group field-loginform-password success">
                                <label className="control-label" htmlFor="loginform-password">
                                    Api Key
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="apiKey"
                                    onChange={this.onChange}
                                    value={this.state.apiKey}
                                    tabIndex={2}
                                    autoComplete="off"
                                    placeholder="Password"
                                    aria-required="true"
                                    aria-invalid="false"
                                />
                                <input type="submit" className="login-button" value="Login" />
                            </div>
                        </form>
                    </section>
                    {this.props.error && <div>Wrong API key</div>}
                </div>
            </LoginStyled>
        );
    }
}
