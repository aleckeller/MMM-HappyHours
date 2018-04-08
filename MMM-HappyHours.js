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
    updateInterval: 10000000,
    initialLoadDelay: 875,
    state: 'us_va',
    city: 'herndon',
    useDayOfWeek: true
  },

  start: function() {
    console.log("Starting " + this.name);

    this.loaded = false;
    this.url = this.getUrl();
    this.scheduleUpdate();
    this.happyHours = "";

  },

  getUrl: function() {
    var url = "";
    if (this.config.useDayOfWeek) {
      var day = this.getDayOfWeek();
      var base = "http://thehappyhourfinder.com/";
      url = base + this.config.state + "/" + this.config.city + "/?weekday=" + day;
    } else {
      url = base + this.config.state + "/" + this.config.city;
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
    this.sendSocketNotification('GET_HAPPY_HOURS', this.url);
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
    var scrolling = document.createElement("marquee");
    scrolling.behavior = "scroll";
    scrolling.direction = "up";
    scrolling.height = "200";
    scrolling.width = "500";
    for (i = 0; i < this.happyHours.length; i++){
      scrolling.innerHTML += this.happyHours[i];
      for (j = 0; j < 8; j++){
        scrolling.innerHTML += "<br>"
      }
    }
    wrapper.appendChild(scrolling);
    return wrapper;

  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "HAPPY_HOURS_RESULT") {
      this.loaded = true;
      this.happyHours = payload;
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
