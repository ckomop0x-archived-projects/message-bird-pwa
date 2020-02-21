import * as React from 'react';
import {
  BigLogo,
  Container,
  LoginButton,
  LoginStyled,
  SignUpBox,
  SignUpDescription,
  SignupHeading,
  SkewedBackground,
  TextOnLine,
  TextOnLineColumn
} from './styles';

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
    const { value } = element;

    this.setState({
      apiKey: value
    });
  }

  private onFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
    const { apiKey } = this.state;
    event.preventDefault();

    if (apiKey) {
      this.props.onKeyChange(apiKey);
    }
  }

  render() {
    return (
      <LoginStyled>
        <SkewedBackground />
        <BigLogo title="Message Bird Application">
          <img src={require('../../../../icons/big-logo.svg')} alt="Logo" />
        </BigLogo>
        <SignUpBox>
          <Container>
            <SignupHeading>Welcome back!</SignupHeading>
            <SignUpDescription>
              No account yet?{' '}
              <a href="https://dashboard.messagebird.com/en/sign-up">
                Sign up for free
              </a>
            </SignUpDescription>
          </Container>
          <TextOnLineColumn>
            <TextOnLine>or</TextOnLine>
          </TextOnLineColumn>
          <section>
            <form onSubmit={this.onFormSubmit}>
              <div>
                <label htmlFor="loginform-password">Api Key</label>
                <input
                  type="password"
                  name="apiKey"
                  onChange={this.onChange}
                  value={this.state.apiKey}
                  tabIndex={2}
                  autoComplete="off"
                  placeholder="Password"
                  aria-required="true"
                  aria-invalid="false"
                />
                <LoginButton type="submit" value="Login" />
              </div>
            </form>
          </section>
          {this.props.error && <div>Wrong API key</div>}
        </SignUpBox>
      </LoginStyled>
    );
  }
}
