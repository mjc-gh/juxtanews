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
jQuery.fn.extend({
  centerTo: function(el){
    if (!el.jquery)
      el = $(el);

    return this.css({
      top: (el.height() / 2) - (this.height() / 2),
      left: (el.width() / 2) - (this.width() / 2)
    })
  },

  delay:function(duration, callback){
    return this.animate({_:0}, duration, callback);
  }
});

// localize date
function ld(str){
  if (!str)
    return 'Unknown Date';

  var date = new Date(str);

  var hr = date.getHours();
  var min = date.getMinutes();

  return (hr > 0 ? (hr % 12 ? hr % 12 : hr) : '12') + ':' + (min < 10 ? '0' + min : min) + (hr > 11 ?'p':'a') +' '+
    (date.getMonth()+1) +'/'+ date.getDate() +'/'+ (date.getFullYear() - 0x7D0);
}

// titelize for views
function titleize(str){
  return _.map((str+'').split(' '), function(s){ return s[0].toUpperCase() + s.substr(1); }).join(' ');
}

(function(){
  var make = Backbone.View.prototype.make;

  Backbone.View._generateTemplate = function(str){
    // customize your template here
    return Juxtanews.tmpl(str);
  };

  Backbone.View.prototype.make = function(){
    var el = make.apply(this, arguments);

    if (typeof this.template === 'string')
      this.template = Backbone.View._generateTemplate(this.template);

    return el;
  };
}());
