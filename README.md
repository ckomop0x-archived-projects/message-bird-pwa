# Message Bird

Small application that allows to work with Message Bird SMS service.   
  
Try online:  
https://message-bird.herokuapp.com

## Used technologies:
1. React
2. TypeScript
3. Styled-components
4. NodeJS (Express) 
5. Websockets
6. Webpack
7. Jest, Enzyme
8. Prettier and TSLint for code checking and formatting

## Description:
This application allows a user to fill in a phone number and a message, 
send the message to Message Bird API, receive messages via a webhook.
 
This is done with POST API and Websockets. When the server obtains
POST request from Message Bird API it sends through WebSockets a broadcast to the connected client and after this, it refreshes SMS list from the Message Bird. 

To use the service you need to register and obtain a new key on the:
https://dashboard.messagebird.com/en/sign-up
After you can use the application to send and check messages. 
If you want to have the possibility to update messages in real-time you 
need to set webhooks on the 
https://dashboard.messagebird.com/en/flow-builder
and forward messages to application 
https://message-bird.herokuapp.com (POST request).

## TODO: 
1. The posibility to check the sign of the message recieved via webhook.  
2. Realtime balance update.   
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
In order to use this webserver you need to publish it to a hosting with 
NodeJS env support.
