/* node helper */

/* Magic Mirror
 * Module: MMM-HappyHours
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node_helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_HAPPY_HOURS') {
      this.getHappyHourHTML(payload);
    }
  },

  getHappyHourHTML: function(url){
    request(url, function (error, response, body) {
      if (error){
        return console.error('Error:',error);
      }
      else{
        console.log(body);
        this.sendSocketNotification('HAPPY_HOURS_RESULT', "Parsed happy hours");
      }
    });
  },

});
