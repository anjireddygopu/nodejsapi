var https = require('https');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session  =  require('express-session');  
var app = express();
var fs = require('fs');
var pool = require('./routes/database.js');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret: 'super.super.secret.shhh',saveUninitialized: true,resave: true}));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
app.all('/api/v1/*', [require('./middlewares/validateRequest')]); 
app.use('/', require('./routes'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/* app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
}); */
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var serverConfig = {
  key: fs.readFileSync('apache.key'),
  cert: fs.readFileSync('apache.crt')
};
var httpsServer = https.createServer(serverConfig, app);
httpsServer.listen(3000, '0.0.0.0');
var wss = new WebSocketServer({ server: httpsServer });
var clients = [];
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    var cmdParsed = JSON.parse(message);
    console.log(cmdParsed);
    if (typeof cmdParsed.forceReload !== 'undefined') {
      console.log(message);
      for (var i in clients) {
        if (typeof clients[i].caseId !== 'undefined') {
          if (clients[i].caseId == cmdParsed.forceReload)
            clients[i].send(JSON.stringify({ "reload": true }));
        }
      }
    }
    else if (typeof cmdParsed.logout !== 'undefined') {
      console.log(message);
      for (var j in clients) {
        if (typeof clients[j].user !== 'undefined') {
          if ((clients[j].user == cmdParsed.logout) || (clients[j].user == cmdParsed.logoutAssigned)) {
            clients[j].send(JSON.stringify({ 'hangup': true }));
          }
        }
      }
    }
    else if (typeof cmdParsed.user !== 'undefined') {
      console.log(message);
      this.user = cmdParsed.user;
      this.assigned = cmdParsed.assigned;
      clients.push(ws);
      console.log(clients.length);
      for (var k in clients) {
        if (clients[k].assigned == this.user || clients[k].user == this.assigned) {
          this.partner = clients[k];
          clients[k].partner = this;
          this.send(JSON.stringify({ 'online': true }));
          this.partner.send(JSON.stringify({ 'online': true }));
          this.send(JSON.stringify({ 'to': this.assigned }));
          this.partner.send(JSON.stringify({ 'from': this.user }));
        }
      }
    }

    else if (typeof cmdParsed.ready !== 'undefined') {
      this.ready = cmdParsed.ready;
     
      if ((typeof this.partner.ready !== 'undefined') && (this.partner.ready == true)) {
        console.log('ready');
        this.partner.send(JSON.stringify({ 'initiate': true }));

      }
    }
     else if (typeof cmdParsed.chat !== 'undefined') {
      // var dbc = mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, database: DB_NAME });
       var escapedChat = pool.escape(cmdParsed.chat);
       var query = "INSERT INTO th_messages (assigneduser_id, user_id, message) VALUES ('" + this.assigned + "',' " + this.user + "', " + escapedChat + ")";
       pool.query(query, function (error, results, fields) { if (error) console.log('query chat: ' + error); });
       pool.end(function (err) { console.log('chat: ' + err); });
       if (this.partner)
         this.partner.send(message);
     }
    else {
      console.log('received sdp/ice message from user ' + this.user);
      this.send(message);
      if (this.partner) {
        this.partner.send(message);
      }
    }
  });
  ws.on('close', function () {
    if ((typeof this.user !== 'undefined')) {

      clients.splice(clients.indexOf(this), 1);
      console.log(clients.length);
      if (this.partner) {
        this.partner.ready = false;
        this.ready = false;
        this.partner.send(JSON.stringify({ 'hangup': true }));
        this.partner.partner = null;

      }
    }
  });
});
console.log('Server running. Visit https://localhost:' + 3000 + ' in Firefox/Chrome.\n\n\
Some important notes:\n\
  * Note the HTTPS; there is no HTTP -> HTTPS redirect.\n\
  * You\'ll also need to accept the invalid TLS certificate.\n\
  * Some browsers or OSs may not allow the webcam to be used by multiple pages at once. You may need to use two different browsers or machines.\n'
);