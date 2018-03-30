/* global Module */

/* Magic Mirror
 * Module: MMM-Stylist
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-Stylist", {

	defaults: {
		timeFormat: config.timeFormat,
		timezone: null,
	},

	 start: function() {
	 	Log.log(this.name + ' started');
	 	var self = this;
	 	setInterval(function() {
	 		self.updateDom();
	 	},1000);

	 	moment.locale(config.language);
	 	this.temperature = "";
	 	this.dayString = "";
	 	this.timeString = "";
	 	this.loaded = false;

	 },

	getDom: function() {
		//main wrapper
		var wrapper = document.createElement("div");
		var outfit = document.createElement("img");
		outfit.src = this.data.path + "/friends.jpg";
		outfit.className = "outfit";
		//************************** DATE AND TIME ****************************
		var dtWrapper = document.createElement("div");
		dtWrapper.className = "bright small light";

		if (!this.loaded){
			wrapper.innerHTML = "Loading Stylist...";
			return wrapper;
		}

		wrapper.appendChild(outfit);
		//create moment
		var now = moment();
		//get timezone
		if (this.config.timezone) {
			now.tz(this.config.timezone);
		}
		//determine if user wants 12 or 24 hour clock
		var hour = "HH";
		if (this.config.timeFormat !== 24){
			hour = "h";
		}
		//get time
		this.timeString = now.format(hour + ":mma");
		//get day
		this.dayString = now.format("dddd");
		//combine time and day
		dtWrapper.innerHTML = this.dayString + " " + this.timeString + " " + this.temperature + "\u00B0";
		wrapper.appendChild(dtWrapper);

		return wrapper;

	},

	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
			this.loaded = true;
			this.processData(payload.data);
		}
	},

	processData: function(data){
		if (!data || !data.main || typeof data.main.temp === "undefined"){
			this.temperature = "Did not process correctly";
		}
		else{
			this.temperature = parseFloat(data.main.temp).toFixed(0);
		}
	},

	getStyles() {
		return ['font-awesome.css', 'MMM-Stylist.css'];
	},

	 getScripts: function() {
	 	return ['moment.js'];
	},

});
