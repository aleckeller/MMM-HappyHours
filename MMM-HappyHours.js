/* global Module */

/* Magic Mirror
 * Module: MMM-HappyHours
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-HappyHours", {

  //default config
  defaults: {
    updateInterval: 10000,
		initialLoadDelay: 875,
    state: 'us_va',
    city: 'arlington-3'
  },

  start: function() {
		console.log("Starting " + this.name);

    this.loaded = false;
		this.url = this.getUrl();
    this.scheduleUpdate();

  },

	getUrl: function() {
		var url = "www.testurl.com";
		return url;
	},

  scheduleUpdate: function() {
		//immediately get happy hours
		this.getHappyHours();
		//then repeat for the interval
		setInterval(() => {
      this.getHappyHours();
    }, this.config.updateInterval);
  },

	getHappyHours: function() {
    this.sendSocketNotification('GET_HAPPY_HOURS',this.url);
  },

  getDom: function() {
    //main wrapper
    var wrapper = document.createElement("div");

    //show loading screen
    if (!this.loaded) {
      wrapper.innerHTML = "Finding Happy Hours Near You...";
      return wrapper;
    }
		wrapper.innerHTML = "Loaded!";
		return wrapper;

  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "HAPPY_HOURS_RESULT") {
      this.loaded = true;
			console.log(payload);
    }
  },

  getStyles() {
    return ['font-awesome.css', 'MMM-HappyHours.css'];
  },

  getScripts: function() {
    return ['moment.js'];
  }

});
