var db = require('../db');

var controllers = require('../controllers');


//start sql server connection
// db = db.dbConnection.connect();


module.exports = {
  //start our database connection
  
  
  messages: {
    get: function (req, res) {
      db.query(('SELECT messages FROM messages'), function(err, rows, fields) {
        if (err) {
          throw err; 
        }
        
        
        // return rows;
        //send back messages
        let messageArr = [];
        for (let i = 0; i < rows.length; i++) {
          messageArr.push(rows[i].messages);
        }
        return(messageArr);
        // res.end(rows[0]);
      });

      
      
    }, // a function which produces all the messages
    post: function (req) {
      db.query((`INSERT INTO messages (userId, messages, roomId) VALUES (${req} , ${req}, ${req})`), function(err, rows, fields){});
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.query(('SELECT username FROM users'), function(err, rows, fields) {
        if (err) {
          throw err; 
        }
        let userArr = [];
        for (let i = 0; i < rows.length; i++) {
          userArr.push(rows[i].username);
        }
        return(userArr);
      });
    },
    post: function (req) {
      db.query((`INSERT INTO users (userId, username) VALUES (${req} , ${req})`), function(err, rows, fields){});
      
  
    } 
  }
};
