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
      var body = '';
      req.on('data', function(chunks) {
        body += chunks;
      });
      req.on('end', function(err, data) {
        body = qs.parse(body);
        var username = body.username;
        var message = body.text;
        var roomName = body.roomname;
        
        db.query((`INSERT INTO messages (userId, messages, roomId) VALUES (${req} , ${req}, ${req})`), function(err, rows, fields){});
        
        
      });
      
      
      
      
      
    } // a function which can be used to insert a message into the database
  },

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
      db.query((`INSERT INTO users (userId, username) VALUES (${req} , ${req})`), function(err, rows, fields){});
      
  
    } 
  }
};







