var db = require('../db');

var controllers = require('../controllers');


//start sql server connection
// db = db.dbConnection.connect();


module.exports = {
  //start our database connection
  
  
  messages: {
    get: function (req, res) {
      
      db.query((`SELECT messages FROM messages`), function(err, rows, fields) {
        if (err) {
          throw err; 
        }
  
        for (var i in rows) {
          console.log('Get request', rows[i]);
        }
        
      });
      
    }, // a function which produces all the messages
    post: function () {
      console.log("in models.messages.post");
      
      // connection.query('INSERT INTO messages VALUES ');
      // return data;
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      //connection.query(`SELECT username FROM users`);
    },
    post: function () {
     
      //connection.query(`INSERT INTO users VALUES `);
        
    } 
  }
};

