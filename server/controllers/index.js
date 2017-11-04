var models = require('../models');
var Promise = require('bluebird');
//communicates with our chat client and sends data to models

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res); //sends response back to router   
  
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req); 
      
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req, res); 
     
    },
    post: function (req, res) {
      models.users.post(req); 
    }
  }
};

