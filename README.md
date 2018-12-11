# Message Bird

A small application, that allows working with Message Bird SMS service.   
  
Try online:  
https://message-bird.herokuapp.com

## Used technologies:
1. React
2. TypeScript
3. Styled-components
4. NodeJS (Express) 
5. WebSockets (Socket.io)
6. Webpack
7. Jest, Enzyme
8. Prettier and TSLint for code checking and formatting

## Description:
This application allows a user to fill in a phone number and a message, then send a message to Message Bird API and receive messages via a webhook.
 
This is done with POST API and WebSockets (Socket.io). When the server obtains POST request from Message Bird API it sends through WebSockets a broadcast to the connected client and after this, it refreshes SMS list from the Message Bird. 

To use the service you need to register and obtain a new key on the:
https://dashboard.messagebird.com/en/sign-up  
After you can use the application to send and check messages. 
If you want to have the possibility to update messages in real-time you 
need to set webhooks on the  
https://dashboard.messagebird.com/en/flow-builder  
and forward messages to the application   
https://message-bird.herokuapp.com/webhook (POST request).

## TODO: 
1. The possibility to check the sign of the message received via webhook.  
2. Real-time balance update.   
3. Write tests for service and components.  
4. Styling.  

## Start client locally
```
npm install
npm run client 
```
## Start server
```
npm run buildserver && npm run start
```
In order to use this web server you need to publish it to a hosting with 
NodeJS env support.
