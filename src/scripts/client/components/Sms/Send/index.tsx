import * as NProgress from 'nprogress';
import * as React from 'react';
import {RightContainerProps} from '../../RightContainer/index';
import {DashboardStyled} from '../Dashboard/styles';
import {ErrorMessage, FormField, FormTextBlock, SendButton, SendForm, SmsCount, TextArea} from './styles';

export enum Messages {
    SHORT_NUMBER = "Ah, that's a bit too short for a phone number.",
    CANT_BE_BLANK = 'Cannot be Blank!',
    SEND_SMS = 'Send SMS'
}

export interface SendState {
    originator: number;
    recipient: number;
    message: string;
    recipientError?: string;
    originatorError?: string;
    messageError?: string;
}

export default class Send extends React.PureComponent<RightContainerProps, SendState> {
    constructor(props: RightContainerProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onOriginatorFieldChange = this.onOriginatorFieldChange.bind(this);
        this.onRecipientFiledChange = this.onRecipientFiledChange.bind(this);
        this.onMessageFieldChange = this.onMessageFieldChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            originator: 0,
            recipient: 0,
            message: ''
        };
    }

    private onRecipientFiledChange(event: React.FormEvent<HTMLInputElement>): void {
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
                    this.setState({recipientError: `Recipient ${Messages.CANT_BE_BLANK}`});
                } else if (value.toString().length < 8) {
                    this.setState({recipientError: Messages.SHORT_NUMBER});
                }
                break;
            case 'originator':
                if (!value) {
                    this.setState({originatorError: `Originator ${Messages.CANT_BE_BLANK}`});
                } else if (value.toString().length < 8) {
                    this.setState({originatorError: Messages.SHORT_NUMBER});
                }
                break;
            default:
            //
        }
    }

    private onOriginatorFieldChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value} = element;

        this.setState({
            originator: Number(value) || 0
        });
    }

    private onMessageFieldChange(event: React.FormEvent<HTMLTextAreaElement>): void {
        const element: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        const {value} = element;

        this.setState({
            message: String(value || '')
        });
    }

    private onFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!this.state.originator) {
            this.setState({originatorError: `Originator ${Messages.CANT_BE_BLANK}`});
            return;
        }

        if (this.state.recipient.toString().length < 8) {
            this.setState({
                recipientError: Messages.SHORT_NUMBER
            });
            return;
        }

        if (!this.state.recipient) {
            this.setState({recipientError: `Recipient ${Messages.CANT_BE_BLANK}`});
            return;
        }

        if (!this.state.message) {
            this.setState({messageError: `Message ${Messages.CANT_BE_BLANK}`});
            return;
        }

        if (this.props.isOffline) {
            return alert('This action disabled while app is offline!');
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
        const maxMessageLenght: number = 1377;

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
                            onChange={this.onRecipientFiledChange}
                        />
                        <ErrorMessage>{this.state.recipientError}</ErrorMessage>
                    </FormField>
                    <FormField>
                        <input
                            type="number"
                            name="originator"
                            placeholder="Originator"
                            onBlur={this.handleBlur}
                            value={this.state.originator || ''}
                            defaultValue={undefined}
                            onChange={this.onOriginatorFieldChange}
                        />
                        <ErrorMessage>{this.state.originatorError}</ErrorMessage>
                    </FormField>
                    <FormTextBlock>
                        <TextArea
                            name="message"
                            placeholder="Message"
                            cols={30}
                            rows={10}
                            value={this.state.message || ''}
                            onChange={this.onMessageFieldChange}
                        />
                        <SmsCount>
                            {this.state.message.length}/{maxMessageLenght},{' '}
                            {this.state.message.length === 0 ? ' 0' : Math.floor(this.state.message.length / 160 + 1)}{' '}
                            SMS
                        </SmsCount>
                        <ErrorMessage>{this.state.messageError}</ErrorMessage>
                    </FormTextBlock>
                    <SendButton type="submit">
                        <i className="fa fa-comment" />
                        {Messages.SEND_SMS}
                    </SendButton>
                </SendForm>
            </DashboardStyled>
        );
    }
}
