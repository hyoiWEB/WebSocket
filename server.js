'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection',function(ws){

      ws.on('message',function(message){
          console.log(message);

          wss.clients.forEach(function(client){
              client.send(message);
          });
      });

      ws.on('close',function(){
          console.log('I lost a client');
      });

  });

  console.log = function (log) {
  document.getElementById('console_log').innerHTML += log + "<br>"};
