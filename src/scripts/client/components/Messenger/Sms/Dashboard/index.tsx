import * as NProgress from 'nprogress';
import * as React from 'react';
import * as Loadable from 'react-loadable';
import getMessages, {Message} from '../../../../../services/message-bird-api/get-messages';
import {DashboardStyled} from './styles';

export interface DashboardState {
    messages: Message[];
    response: boolean;
}

export interface DashboardProps {
    filter: string;
    apiKey: string;
    socket: any;
    sendNotification({}): void;
}

const LoadableMessagesTable = Loadable({
    loader: () => import('./MessagesTable/index'),
    loading() {
        return <div>Loading...</div>;
    },
    delay: 20000,
    timeout: 10000
});

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    _isMounted: boolean;

    constructor(props: DashboardProps) {
        super(props);
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
        NProgress.done();
        this._isMounted = true;

        if (this.props.apiKey) {
            this.getMessages(this.props.apiKey);
        }

        if (this.props.socket) {
            this.props.socket.on('message', (messageData: string) => {
                if (messageData !== 'newmessage') {
                    return;
                }

                this.props.sendNotification({
                    body: 'Read message now',
                    click_action: '/#/messenger/',
                    icon: require('../../../../../../assets/favicon.png'),
                    image: require('../../../../../../assets/favicon.png'),
                    title: 'You have a new message'
                });

                return this.getMessages(this.props.apiKey);
            });
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    componentWillMount() {
        NProgress.start();
    }

    render() {
        let filteredMessages: Message[] = [];
        const {messages} = this.state;

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
                {messages !== [] ? (
                    <>
                        <div>Below you'll find an overview of the sent and received messages for the last 30 days.</div>
                        <LoadableMessagesTable messages={filteredMessages} />
                    </>
                ) : (
                    <div>No messages</div>
                )}
            </DashboardStyled>
        );
    }
}
