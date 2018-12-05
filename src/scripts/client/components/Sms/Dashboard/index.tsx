import * as React from 'react';
import * as moment from 'moment';
import * as NProgress from 'nprogress';
const Websocket = require('react-websocket');
import getMessages, {Message} from '../../../services/get-messages';
import {DashboardStyled, MessagesTable} from './styles';

export interface DashboardState {
    messages: Message[];
}

export interface DashboardProps {
    apiKey: string;
    [key: string]: any;
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    _isMounted: boolean;
    update: any;

    constructor(props: DashboardProps) {
        super(props);

        this.getMessages = this.getMessages.bind(this);
        this._isMounted = false;
        this.state = {
            messages: []
        };
    }

    async getMessages(apiKey: string) {
        try {
            const response: any = await getMessages(apiKey);

            if (this.state.messages !== response.data.items && this._isMounted === true) {
                this.setState({
                    messages: response.data.items
                });
            }
        } catch (err) {
            console.error(err);
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
    }

    componentWillMount() {
        NProgress.start();
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.update);
    }

    render() {
        let filteredMessages: Message[] = [];
        const {messages} = this.state;
        const today: Date = new Date();
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
                    break;
            }
        }

        return (
            <DashboardStyled>
                <Websocket url="wss://message-bird.herokuapp.com" onMessage={this.getMessages(this.props.apiKey)} />
                {messages !== [] ? (
                    <>
                        <div>Below you'll find an overview of the sent and received messages for the last 30 days.</div>
                        <MessagesTable>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Recipient</th>
                                        <th>Originator</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Read</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMessages &&
                                        filteredMessages.map(
                                            ({
                                                id,
                                                direction,
                                                originator,
                                                recipients,
                                                body,
                                                createdDatetime
                                            }: Message) => {
                                                const {totalCount, totalDeliveredCount, items} = recipients;
                                                const isMultipleMessages: boolean = totalCount > 1;
                                                const date: Date =
                                                    direction === 'mo'
                                                        ? new Date(createdDatetime.toString())
                                                        : new Date(items[0].statusDatetime.toString());
                                                const isToday: boolean = date.toDateString() === today.toDateString();
                                                const singleMessageStatus: string = items[0].status;
                                                const multipleMessagesStatus: string = (
                                                    (totalDeliveredCount / totalCount) *
                                                    100
                                                )
                                                    .toFixed(1)
                                                    .toString();
                                                const todayTime: string = moment(date).format('HH:mm');
                                                const fullDate = moment(date).format('MM.DD.YY');

                                                return (
                                                    <tr key={id}>
                                                        <td>
                                                            {direction === 'mt' ? (
                                                                <i
                                                                    className="fa fa-arrow-right pull-right"
                                                                    data-rel="tooltip"
                                                                    title="Sent message"
                                                                />
                                                            ) : (
                                                                <i
                                                                    className="fa fa-arrow-left pull-left"
                                                                    data-rel="tooltip"
                                                                    title="Received message"
                                                                />
                                                            )}
                                                        </td>
                                                        <td>
                                                            {isMultipleMessages
                                                                ? `${totalCount} recipients`
                                                                : items[0].recipient}
                                                        </td>
                                                        <td>{originator}</td>
                                                        <td>{body}</td>
                                                        <td>
                                                            {isMultipleMessages
                                                                ? `groups message ${multipleMessagesStatus}% delivered`
                                                                : singleMessageStatus}
                                                        </td>
                                                        <td>{isToday ? todayTime : fullDate}</td>
                                                        <td>
                                                            <button>
                                                                <i className="fa fa-file-text-o" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                </tbody>
                            </table>
                        </MessagesTable>
                    </>
                ) : (
                    <div>No messages</div>
                )}
            </DashboardStyled>
        );
    }
}
