//= require vendor/jquery-1-7-2
//= require vendor/underscore
//= require vendor/backbone
//= require juxtanews
//= require_tree .

$(function(){
	Juxtanews.app = new Juxtanews.Router();

	Backbone.history.start();
});
