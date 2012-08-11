Juxtanews.Router = Backbone.Router.extend({
	routes: {
		'': 'sites:index',
		'sites/:id': 'sites:show',
		'sites/:site_id/snapshots/:id': 'snapshots:show'
	},

	initialize:function(){
		var events = {};

		// inverted routes object map
		for (var route in this.routes)
			events[this.routes[route]] = route;

		// whenever controller is trigged try to navigate()
		Juxtanews.controllers.on('all', function(ev){
			var args = Array.prototype.splice.call(arguments, 1);
			var route = events[ev].split(/\/:\w+\/?/, args.length);
			var fragment = _.chain(route).zip(args).flatten().join('/');

			console.log('controller#trigger', ev, args);

			this.navigate(fragment._wrapped, { silent: true });
		}, this);
	},

	route:function(route, name){
		var controllers = Juxtanews.controllers

		Backbone.Router.prototype.route.call(this, route, name, function(){
			console.log('route', name);
			var args = Array.prototype.slice.call(arguments);

			args.unshift(name);
			controllers.trigger.apply(controllers, args);
		});
	}
});
