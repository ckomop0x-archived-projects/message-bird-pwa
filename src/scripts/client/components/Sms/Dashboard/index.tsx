import * as NProgress from 'nprogress';
import * as React from 'react';
import * as socketIOClient from 'socket.io-client';
import getMessages, {Message} from '../../../../services/get-messages';
import MessagesTable from './MessagesTable/index';
import {DashboardStyled} from './styles';

export interface DashboardState {
    messages: Message[];
    response: boolean;
}

export interface DashboardProps {
    apiKey: string;
    [key: string]: any;
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    _isMounted: boolean;
    socket: SocketIOClient.Socket;

    constructor(props: DashboardProps) {
        super(props);
        this.socket = socketIOClient('https://message-bird.herokuapp.com:8999');
        this.getMessages = this.getMessages.bind(this);
        this._isMounted = false;
        this.state = {
            messages: [],
            response: false
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

        NProgress.done();
        this._isMounted = true;

        if (apiKey) {
            this.getMessages(apiKey);
        }

        this.socket.on('message', (data: any) => {
            console.log(data);

            return this.getMessages(apiKey);
        });
    }

    componentWillUnmount(): void {
        this.socket.disconnect();
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
