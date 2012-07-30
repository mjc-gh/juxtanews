// define Juxtanews namespace
var Juxtanews = {
	extend: function(obj){
		return _.extend(this, obj);
	},

	tmpl: function(selector){
		return _.template($(selector).html());
	}
};

// polyfill for Date#now
if (!Date.now) Date.now = function(){ return +new Date(); }

// redefine underscore template options
_.templateSettings.interpolate = /\{\{\=(.+?)\}\}/g;
_.templateSettings.evaluate = /\{\{(.+?)\}\}/g;

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


