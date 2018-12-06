import axios from 'axios';

export interface Message {
    id: string;
    href: string;
    direction: string;
    type: string;
    originator: string;
    body: string;
    reference: string;
    validity: null;
    gateway: number;
    typeDetails: {};
    datacoding: string;
    mclass: number;
    scheduledDatetime: null;
    createdDatetime: string;
    recipients: Recepients;
}

export interface Recepients {
    totalCount: number;
    totalSentCount: number;
    totalDeliveredCount: number;
    totalDeliveryFailedCount: number;
    items: MessageRecipient[];
}

export interface MessageRecipient {
    recipient: number;
    originator: number;
    status: string;
    statusDatetime: string;
}

export interface MessagesResponse {
    data: {
        offset: number;
        limit: number;
        count: number;
        totalCount: number;
        links: {
            first: string;
            previous: string;
            next: string;
            last: string;
        };
        items: Message[];
    };
}

export default function getMessages(ApiKey: string): Promise<MessagesResponse> {
    return axios({
        method: 'get',
        url: 'https://rest.messagebird.com/messages',
        auth: {
            username: 'AccessKey',
            password: ApiKey
        }
    });
}
