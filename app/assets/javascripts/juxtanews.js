// define Juxtanews namespace
var Juxtanews = {
	extend: function(obj){
		return _.extend(this, obj);
	},

	tmpl: function(selector){
		return _.template($(selector).html());
	},

	controllers: _.extend({}, Backbone.Events),
};

// polyfill for Date#now
if (!Date.now) Date.now = function(){ return +new Date(); }

// redefine underscore template options
_.templateSettings.interpolate = /\{\{\=(.+?)\}\}/g;
_.templateSettings.evaluate = /\{\{(.+?)\}\}/g;

// centerTo jquery method
jQuery.fn.centerTo = function(el){
	if (!el.jquery)
		el = $(el);

	return this.css({
		top: (el.height() / 2) - (this.height() / 2),
		left: (el.width() / 2) - (this.width() / 2)
	});
}

// localize date
function ld(str){
	if (!str)
		return 'Unknown Date';

	var date = new Date(str);

	var hr = date.getHours();
	var min = date.getMinutes();

	return date.getMonth()+1 +'/'+ date.getDate() +'/'+ date.getFullYear() +' at '+
	      (hr > 0 ? (hr % 12 ? hr % 12 : hr) : '12') + ':' + (min < 10 ? '0' + min : min) +' '+ (hr > 11 ?'PM':'AM');
}


