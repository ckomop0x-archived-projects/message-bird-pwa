import * as NProgress from 'nprogress';
import * as React from 'react';
import * as socketIOClient from 'socket.io-client';
import getMessages, {Message} from '../../../services/get-messages';
import MessagesTable from './MessagesTable/index';
import {DashboardStyled} from './styles';

const Websocket = require('react-websocket');

export interface DashboardState {
    messages: Message[];
    response: boolean;
    endpoint: string;
}

export interface DashboardProps {
    apiKey: string;
    [key: string]: any;
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    _isMounted: boolean;

    constructor(props: DashboardProps) {
        super(props);

        this.getMessages = this.getMessages.bind(this);
        this._isMounted = false;
        this.state = {
            messages: [],
            response: false,
            endpoint: 'http://localhost:8999'
        };
    }

    async getMessages(apiKey: string) {
        try {
            const response: any = await getMessages(apiKey);

            if (!this._isMounted) {
                return;
            }
            if (this.state.messages !== response.data.items) {
                this.setState({
                    messages: response.data.items
                });
            }
        } catch (err) {
            console.error(err.name);
        }
    }

    componentDidUpdate(prevProps: DashboardProps): void {
        const {apiKey} = this.props;

        if (apiKey !== prevProps.apiKey) {
            this.getMessages(apiKey);
        }
    }

    componentDidMount() {
        const {apiKey} = this.props;
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);

        NProgress.done();
        this._isMounted = true;

        if (apiKey) {
            this.getMessages(apiKey);
        }

        socket.on('FromAPI', (data: any) => this.setState({response: data}));
    }

    componentWillMount() {
        NProgress.start();
    }

    render() {
        let filteredMessages: Message[] = [];
        const {messages, response} = this.state;

        if (messages !== []) {
            switch (this.props.filter) {
                case 'inbox':
                    filteredMessages = messages.filter(({direction}: Message) => direction === 'mo');
                    break;
                case 'outbox':
                    filteredMessages = messages.filter(({direction}: Message) => direction === 'mt');
                    break;
                default:
                    filteredMessages = messages;
            }
        }

        return (
            <DashboardStyled>
                {/*<Websocket url="wss://message-bird.herokuapp.com" onMessage={this.getMessages(this.props.apiKey)} />*/}
                <div style={{textAlign: 'center'}}>
                    {response ? <p>The temperature in Florence is: {response} °F</p> : <p>Loading...</p>}
                </div>
                {messages !== [] ? (
                    <>
                        <div>Below you'll find an overview of the sent and received messages for the last 30 days.</div>
                        <MessagesTable messages={filteredMessages} />
                    </>
                ) : (
                    <div>No messages</div>
                )}
            </DashboardStyled>
        );
    }
}
