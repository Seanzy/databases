var db = require('../db');
var qs = require('querystring');

var controllers = require('../controllers');


//start sql server connection
// db = db.dbConnection.connect();


module.exports = {
  //start our database connection
  
  
  messages: {
    get: function (req, res) {
      db.query(('SELECT messages.message, users.username, rooms.roomname FROM messages INNER JOIN users ON messages.userId = users.userId INNER JOIN rooms ON rooms.roomId = messages.roomId;'), function(err, rows, fields) {
        if (err) {
          throw err; 
        }
        
    
        let messageArr = [];
        for (let i = 0; i < rows.length; i++) {
          var messageObj = {};
  
          messageObj.username = rows[i].username;
          messageObj.text = rows[i].message;
          messageObj.roomname = rows[i].roomname;

          messageArr.push(messageObj);
          
        }
        
        res.send(messageArr);
        
      });
    }, // a function which produces all the messages
    post: function (req) {
      console.log("in post");
      var body = '';
      req.on('data', function(chunks) {
        body += chunks;
      });
      req.on('end', function(err, data) {
        body = qs.parse(body);
        var userName = body.username;
        var message = body.text;
        var roomName = body.roomname;
        
        console.log("body is ", body);
        //grabs user ID
        db.query((`SELECT userId FROM users WHERE users.username = ${userName}`), function(err, rows, fields) {
          if (err) {
            throw err; 
          } 
          var userId = rows[0].userId;
          console.log("user id" , userId);
          db.query((`SELECT roomId FROM rooms WHERE rooms.roomname = ${roomName}`), function(err, rows, fields) {
            if (err) {
              throw err; 
            } 
            var roomId = rows[0].roomId;
            db.query((`INSERT INTO messages (userId, messages, roomId) VALUES (${userId}, ${message}, ${roomId})`), 
              function(err, rows, fields) { 
                if (err) {
                  throw err; 
                } 
                return 0; 
              
              });      
          });
          
          
          
          
          // var userIdQuery = `SELECT userId FROM users WHERE users.username = ${username}`;
          // var roomIdQuery = `SELECT roomId FROM rooms WHERE rooms.roomname = ${roomName}`;  
          
          // console.log('*******************************', userIdQuery);
          // console.log(roomIdQuery);
          
          // db.query((`INSERT INTO messages (userId, messages, roomId) VALUES (${req} , ${message}, ${req})`));
          // db.query((`INSERT INTO messages (userId, messages, roomId) VALUES (7, 'yo momma', 5)`));
          // db.query(`INSERT INTO messages (userId, messages, roomId) VALUES ((SELECT userId FROM users WHERE users.username = ${username}) , ${message}, (SELECT roomId FROM rooms WHERE rooms.roomname = ${roomName}))`);

        });
      });
    } 
  },// a function which can be used to insert a message into the database
  
  users: {
    // Ditto as above.
    get: function (req, res) { 
      db.query(('SELECT username FROM users'), function(err, rows, fields) {
        if (err) {
          throw err; 
        }
        
        var userObj = JSON.stringify(rows);
        userObj = JSON.parse(userObj);
        
        res.send(userObj);
      });
    },
    post: function (req) {
      var body = '';
      req.on('data', function(chunks){
        body += chunks;
      });
      req.on('end', function() {
        body = qs.parse(body);
        var username = body.username;
        db.query((`INSERT INTO users (userId, username) VALUES (${req} , ${username})`));
        
        
      });
    } 
  }
};





