var models = require('../models');
var Promise = require('bluebird');
//communicates with our chat client and sends data to models

module.exports = {
  messages: {
    get: function (req, res) {
      return new Promise((resolve, reject) => {
        resolve(models.messages.get(req)); 
      }).then( (messages) => {
        //send back with res whatever we got from models.messages.get
        res.send(messages);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      return new Promise((resolve, reject) => {
        resolve(models.messages.get(req)); 
      }).then( () => {
        //send back response saying post worked
        res.send("congrats?");
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      return new Promise((resolve, reject) => {
        resolve(models.users.get(req)); 
      }).then( (users) => {
        //send back with res whatever we got from models.messages.get
        res.send(users);
      });    
    },
    post: function (req, res) {
      return new Promise((resolve, reject) => {
        resolve(models.users.post(req)); 
      }).then( () => {
        //send back response saying post worked
        res.send("congrats?");
      });    
    }
  }
};

