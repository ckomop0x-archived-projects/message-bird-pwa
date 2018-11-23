import * as NProgress from 'nprogress';
import * as React from 'react';
import {DashboardStyled} from '../Dashboard/styles';
import {FormField, FormTextarea, SendButton, SendForm} from './styles';

export interface SendState {
    originator: number;
    recipient: number;
    message: string;
    recipientError?: string;
    originatorError?: string;
    messageError?: string;
}

export interface SendProps {
    [key: string]: any;
}

export default class Send extends React.PureComponent<SendProps, SendState> {
    constructor(props: SendProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onOriginatorChange = this.onOriginatorChange.bind(this);
        this.onRecipientChange = this.onRecipientChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            originator: 0,
            recipient: 0,
            message: ''
        };
    }

    private onRecipientChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value} = element;

        this.setState({
            recipient: Number(value) || 0,
            recipientError: ''
        });
    }

    private handleBlur(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value, name} = element;

        switch (name) {
            case 'recipient':
                if (!value) {
                    this.setState({recipientError: 'Recipient Cannot be Blank!'});
                } else if (value.toString().length < 8) {
                    this.setState({recipientError: "Ah, that's a bit too short for a phone number."});
                }
                break;
            case 'originator':
                if (!value) {
                    this.setState({originatorError: 'Originator Cannot be Blank!'});
                } else if (value.toString().length < 8) {
                    this.setState({originatorError: "Ah, that's a bit too short for a phone number."});
                }
                break;
            default:
            //
        }
    }

    private onOriginatorChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value} = element;

        this.setState({
            originator: Number(value) || 0
        });
    }

    private onMessageChange(event: React.FormEvent<HTMLTextAreaElement>): void {
        const element: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const {value} = element;

        this.setState({
            message: String(value || '')
        });
    }

    private onFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!this.state.originator) {
            this.setState({originatorError: 'Originator Cannot be Blank!'});
            return;
        }

        if (this.state.recipient.toString().length < 8) {
            this.setState({
                recipientError: "Ah, that's a bit too short for a phone number."
            });
            return;
        }

        if (!this.state.recipient) {
            this.setState({recipientError: 'Recipient Cannot be Blank!'});
            return;
        }

        if (!this.state.message) {
            this.setState({messageError: 'Message Cannot be Blank!'});
            return;
        }

        this.props.messagebird.messages.create({
            originator: this.state.originator,
            recipients: [this.state.recipient],
            body: this.state.message
        });

        this.defaultState();
    }

    private defaultState() {
        this.setState({
            originator: 0,
            recipient: 0,
            message: '',
            recipientError: '',
            originatorError: '',
            messageError: ''
        });
    }

    componentDidMount() {
        NProgress.done();
    }

    componentWillMount() {
        NProgress.start();
    }

    render() {
        return (
            <DashboardStyled>
                <SendForm onSubmit={this.onFormSubmit}>
                    <FormField>
                        <input
                            type="number"
                            className={this.state.recipientError ? 'inputError' : ''}
                            name="recipient"
                            value={this.state.recipient || ''}
                            defaultValue={undefined}
                            onBlur={this.handleBlur}
                            placeholder="Recipient"
                            onChange={this.onRecipientChange}
                        />
                        <span className="error-msg">{this.state.recipientError}</span>
                    </FormField>
                    <FormField>
                        <input
                            type="number"
                            name="originator"
                            placeholder="Originator"
                            onBlur={this.handleBlur}
                            value={this.state.originator || ''}
                            defaultValue={undefined}
                            onChange={this.onOriginatorChange}
                        />
                        <span className="error-msg">{this.state.originatorError}</span>
                    </FormField>
                    <FormTextarea>
                        <textarea
                            name="message"
                            placeholder="Message"
                            cols={30}
                            rows={10}
                            value={this.state.message || ''}
                            onChange={this.onMessageChange}
                        />
                        <span>
                            <div className="smsCount">
                                {this.state.message.length}/1377,{' '}
                                {this.state.message.length === 0
                                    ? ' 0'
                                    : Math.floor(this.state.message.length / 160 + 1)}{' '}
                                SMS
                            </div>
                        </span>
                        <span className="error-msg">{this.state.messageError}</span>
                    </FormTextarea>
                    <SendButton type="submit">
                        <i className="fa fa-comment" />
                        Send SMS
                    </SendButton>
                </SendForm>
            </DashboardStyled>
        );
    }
}
