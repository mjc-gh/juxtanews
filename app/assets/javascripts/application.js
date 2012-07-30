//= require vendor/jquery-1-7-2
//= require vendor/underscore
//= require vendor/backbone
//= require juxtanews
//= require_tree .

$(function(){
	var sites = new Juxtanews.SiteList();
	var preview = new Juxtanews.SiteListView(sites);

	sites.fetch();
});
