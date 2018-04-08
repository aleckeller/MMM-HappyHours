/* node helper */

/* Magic Mirror
 * Module: MMM-HappyHours
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

const NodeHelper = require('node_helper');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
    request({
        url: url,
        method: 'GET'
    }, (error, response, body) => {
      if (error){
        return console.error('Error:',error);
      }
      else{
        var dom = new JSDOM(body);
        var locationAndTimesHTML = dom.window.document.querySelectorAll(".hh-description");
        var locationAndTimesText = [];
        var headers = dom.window.document.querySelectorAll("h4");
        for (i = 0; i < headers.length; i++){
          if (headers[i].textContent.includes("All")){
            locationAndTimesText[0] = headers[i].textContent.replace('All','');
          }
        }
        for (i = 0; i < locationAndTimesHTML.length; i++){
          locationAndTimesText.push(locationAndTimesHTML[i].textContent);
        }
        this.sendSocketNotification("HAPPY_HOURS_RESULT",locationAndTimesText);
      }
    });
  }

});
