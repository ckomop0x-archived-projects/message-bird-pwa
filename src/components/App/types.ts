export interface BalanceResponse {
  amount: number;
  payment: string;
  type: string;
}

export interface MessageBird {
  balance: {
    read: (
      callback?: (error: Error, balanceResponse: BalanceResponse) => void
    ) => void;
  };
  messages: {
    read: (id: string, callback?: () => void) => void;
    create: (params: MessagesCreateParams, callback?: () => void) => void;
  };
}

export interface MessagesCreateParams {
  recipients: number | number[];
  originator: number;
  body: string;
}
