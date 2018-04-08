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
    useDayOfWeek: true,
    maxWidth: "400px",
    maxHeight: "200px"
  },

  start: function() {
    console.log("Starting " + this.name);

    this.loaded = false;
    this.happyHours = "";
    this.url = this.getUrl();
    this.getHappyHours();

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
    wrapper.style.maxWidth = this.config.maxWidth;

    //show loading screen
    if (!this.loaded) {
      var loadingDiv = document.createElement("div");
      loadingDiv.classList.add("medium","bold");
      loadingDiv.innerHTML = "Finding Happy Hours Near You...";
      wrapper.appendChild(loadingDiv);
      return wrapper;
    }
    //title
    var title = document.createElement("span");
		title.classList.add("medium", "bright","title");
    //capitalize first letter
    var city = this.config.city.charAt(0).toUpperCase() + this.config.city.slice(1);
    var state = this.config.state.split('_')[1].toUpperCase();
		title.innerHTML = "Happy Hours in " + city + "," + state;
		wrapper.appendChild(title);

    var scrolling = document.createElement("marquee");
    //Scrolling box config
    scrolling.behavior = "scroll";
    scrolling.direction = "up";
    scrolling.style.maxHeight = this.config.maxHeight;
    scrolling.classList.add("small","bright","regular");

    //get each happy hour description and add some breaks in between to space out
    for (i = 0; i < this.happyHours.length; i++){
      scrolling.innerHTML += this.happyHours[i];
      for (j = 0; j < 3; j++){
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
