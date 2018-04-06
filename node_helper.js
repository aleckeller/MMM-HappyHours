/* node helper */

/* Magic Mirror
 * Module: MMM-HappyHours
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node_helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_HAPPY_HOURS') {
        console.log(payload)
        this.sendSocketNotification('HAPPY_HOURS_RESULT',"Parsed cool happy hours!!!!!");
    }
  }

});
