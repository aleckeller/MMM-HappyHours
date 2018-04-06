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
    updateInterval: 60000,
		initialLoadDelay: 875,
    state: 'us_va',
    city: 'arlington-3',
    useDayOfWeek: true
  },

  start: function() {
		console.log("Starting " + this.name);

    this.loaded = false;
		this.url = this.getUrl();
    this.scheduleUpdate();

  },

	getUrl: function() {
    var url = "";
    if (this.config.useDayOfWeek) {
      var day = this.getDayOfWeek();
      url = "http://thehappyhourfinder.com/" + this.config.state + "/" + this.config.city + "/?weekday=" + day;
    }
    else{
      url = "http://thehappyhourfinder.com/" + this.config.state + "/" + this.config.city;
    }
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

  getDayOfWeek: function() {
    var date = new Date();
    var weekday = new Array(7);
    weekday[0] = "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";
    return weekday[date.getDay()];
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
      this.updateDom();
    }
  },

  getStyles() {
    return ['font-awesome.css', 'MMM-HappyHours.css'];
  },

  getScripts: function() {
    return ['moment.js'];
  }

});
