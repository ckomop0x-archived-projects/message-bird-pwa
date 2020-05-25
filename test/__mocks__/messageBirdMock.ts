// import { MessageBird } from '../../src/components/App/index';

const messageBirdMock: any = {
  balance: {
    read: jest.fn()
  },
  messages: {
    read: jest.fn(),
    create: jest.fn()
  }
};

export default messageBirdMock;
