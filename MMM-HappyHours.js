/* global Module */

/* Magic Mirror
 * Module: MMM-HappyHours
 *
 * By Alec Keller
 * {{LICENSE}} Licensed.
 */

Module.register("MMM-HappyHours", {

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
	 	this.loaded = false;

	 },

	getDom: function() {
		//main wrapper
		var wrapper = document.createElement("div");
		wrapper.innerHTML = 'Happy hours are hype';

		return wrapper;

	},

	getStyles() {
		return ['font-awesome.css', 'MMM-HappyHours.css'];
	},

	 getScripts: function() {
	 	return ['moment.js'];
	},

});
