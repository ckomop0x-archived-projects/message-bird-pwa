import {MessageBird} from '../../src/scripts/client/components/App/index'; 

const messageBirdMock: MessageBird = {
    balance: {
        read: jest.fn()
    },
    messages: {
        read: jest.fn(),
        create: jest.fn()
    }
}

export default messageBirdMock;
