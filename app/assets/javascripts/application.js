//= require vendor/jquery-1-7-2
//= require vendor/underscore
//= require vendor/backbone
//= require juxtanews
//= require_tree .

$(function(){
  Juxtanews.app = new Juxtanews.Router(Juxtanews.controllers);

  Backbone.history.start();

  // it annoys the shit out of me when a scrollbar disappears from
  // page interaction since content will "jump" a bit to the right.
  // force scroll to body if we start out with scroll.
  if ($(document).height() > $(window).height())
    $('body').css({ 'overflow-y': 'scroll' });
});
