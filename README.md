# Message Bird - Progressive Web Application

The small messenger application. It allows to work with Message Bird API. Main purpose is to use SMS service. With Service Worker under the hood this application also works offline – you can see cached messages, navigate. When new message is arrived you will recieve a push message with link to messages page inside application.
  
Try online:  
https://message-bird.herokuapp.com

New in-progress version:
https://messagebird.now.sh

## Used technologies:
<ol>
<li>React</li>
<li>TypeScript</li>
<li>Styled-components</li>
<li>NodeJS (Express) </li>
<li>WebSockets (Socket.io)</li>
<li>Service Worker</li>
<li>Jest, Enzyme</li>
<li>Prettier and TSLint for code checking and formatting</li>
</ol>

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

## Version history

1.1.0 – Added ServiceWorker to support offline mode.
