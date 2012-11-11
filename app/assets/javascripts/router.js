Juxtanews.Router = Backbone.Router.extend({
  routes: {
    '': 'sites:index',
    'about': 'content:about',
    'sites/:id': 'sites:show',
    'sites/:site_id/snapshots/:id': 'snapshots:show'
  },

  initialize:function(controllers){
    var events = {};

    this.controllers = _.extend(controllers, {
      back: function(){ this.trigger(':back'); }
    });

    // inverted routes object map
    for (var route in this.routes)
      events[this.routes[route]] = route;

    // whenever controller is trigged try to navigate()
    this.controllers.on('all', function(ev){
      if (ev == ':back')
        return window.history.back();

      var args = Array.prototype.splice.call(arguments, 1);
      var route = events[ev].split(/\/:\w+\/?/, args.length);
      var fragment = _.chain(route).zip(args).flatten().join('/');

      console.log('controller#trigger', ev, args);

      this.navigate(fragment._wrapped);
    }, this);
  },

  route:function(route, name){
    Backbone.Router.prototype.route.call(this, route, name, function(){
      console.log('route', name);
      var args = Array.prototype.slice.call(arguments);
      args.unshift(name);

      this.controllers.trigger.apply(this.controllers, args);
    });
  }
});
