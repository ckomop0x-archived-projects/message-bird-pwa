import * as moment from 'moment';
import * as React from 'react';
import {Recepients} from '../../../../../services/get-messages';

export interface MessageItemProps {
    recipients: Recepients;
    direction: string;
    today: Date;
    createdDatetime: string;
    originator: string;
    body: string;
}

const MessageItem = (props: MessageItemProps) => {
    const {recipients, direction, createdDatetime, today, originator, body} = props;
    const {totalCount, totalDeliveredCount, items} = recipients;
    const isMultipleMessages: boolean = totalCount > 1;
    const date: Date =
        direction === 'mo' ? new Date(createdDatetime.toString()) : new Date(items[0].statusDatetime.toString());
    const isToday: boolean = date.toDateString() === today.toDateString();
    const singleMessageStatus: string = items[0].status;
    const multipleMessagesStatus: string = ((totalDeliveredCount / totalCount) * 100).toFixed(1).toString();
    const todayTime: string = moment(date).format('HH:mm');
    const fullDate = moment(date).format('MM.DD.YY');

    return (
        <tr>
            <td>
                {direction === 'mt' ? (
                    <i className="fa fa-arrow-right pull-right" data-rel="tooltip" title="Sent message" />
                ) : (
                    <i className="fa fa-arrow-left pull-left" data-rel="tooltip" title="Received message" />
                )}
            </td>
            <td>{isMultipleMessages ? `${totalCount} recipients` : items[0].recipient}</td>
            <td>{originator}</td>
            <td>{body}</td>
            <td>{isMultipleMessages ? `groups message ${multipleMessagesStatus}% delivered` : singleMessageStatus}</td>
            <td>{isToday ? todayTime : fullDate}</td>
            <td>
                <button>
                    <i className="fa fa-file-text-o" />
                </button>
            </td>
        </tr>
    );
};

export default MessageItem;
