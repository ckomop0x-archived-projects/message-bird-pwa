import * as NProgress from 'nprogress';
import * as React from 'react';
import {DashboardStyled} from '../Dashboard/styles';
import {FormField, FormTextarea, SendButton, SendForm} from './styles';

export interface SendState {
    originator: number;
    recipient: number;
    message: string;
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

        this.state = {
            originator: 0,
            recipient: 0,
            message: ''
        }
    }

    private onRecipientChange(event: React.FormEvent<HTMLInputElement>): void {
        const element: HTMLInputElement = event.target as HTMLInputElement;
        const {value} = element;

        this.setState({
            recipient: Number(value) || 0
        });
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

        this.props.messagebird.messages.create({
            originator: this.state.originator,
            recipients: [this.state.recipient],
            body: this.state.message
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
                            name="recipient"
                            value={this.state.recipient || ''}
                            defaultValue={undefined}
                            placeholder="3161234567"
                            onChange={this.onRecipientChange}
                        />
                    </FormField>
                    <FormField>
                        <input
                            type="number"
                            name="originator"
                            placeholder="3161234567"
                            value={this.state.originator || ''}
                            defaultValue={undefined}
                            onChange={this.onOriginatorChange}
                        />
                    </FormField>
                    <FormTextarea>
                        <textarea
                            name="message"
                            cols={30}
                            rows={10}
                            value={this.state.message || ''}
                            onChange={this.onMessageChange}
                        />
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
