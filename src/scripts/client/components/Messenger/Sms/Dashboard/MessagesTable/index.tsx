import * as React from 'react';
import {Message} from '../../../../../../services/message-bird-api/get-messages';
import {MessagesTableStyled} from './styles';
import MessageItem from './MessageItem';

export interface MessagesTableProps {
    messages: Message[];
}

const MessagesTable = (props: MessagesTableProps) => {
    const {messages} = props;
    const today: Date = new Date();

    return (
        <MessagesTableStyled>
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
                    {messages &&
                        messages.map(({id, direction, originator, recipients, body, createdDatetime}: Message) => (
                            <MessageItem
                                recipients={recipients}
                                originator={originator}
                                key={id}
                                direction={direction}
                                today={today}
                                body={body}
                                createdDatetime={createdDatetime}
                            />
                        ))}
                </tbody>
            </table>
        </MessagesTableStyled>
    );
};

export default MessagesTable;
