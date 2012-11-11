// index page site list (enumerates all sites from Collection)
Juxtanews.extend({
  SiteListNode: Backbone.View.extend({
    model: Juxtanews.Site,
    template: '#site-node-tmpl',

    className: 'snapshot',
    tagName: 'li',

    initialize:function(options){
      this.container = options.container;
      this.model.on('change', this.render, this);
    },

    render: function(){
      if (this.$el.is(':empty')){
        this.$el.html(this.template(this.model.attributes));

        this.$el.img = this.$el.find('img');
        this.$el.time = this.$el.find('strong');

      } else if (this.model.hasChanged('visible')) {
        var state = this.model.get('visible') === true;

        if (state)
          this.$el.fadeIn(500);
        else
          this.$el.fadeOut(500);

      } else {
        var attributes = this.model.attributes;
        var timeEl = this.$el.time;
        var imgEl = this.$el.img;
        var img = new Image;
        var t = 500;

        this.$el.img.fadeOut(t, function(){
          img.src = attributes.last_snapshot_preview;

          $(img).on('load', function(){
            imgEl.prop('src', img.src).fadeIn(t, function(){
              timeEl.text(ld(attributes.last_snapshot_at)).addClass('blink');
            });
          });
        });
      }

      return this;
    },

    events: {
      'click button': function(){
        Juxtanews.controllers.trigger('sites:show', this.model.id);
      },

      'click img':function(){
        Juxtanews.controllers.trigger('snapshots:show', this.model.id, this.model.attributes.last_snapshot_id);
      }
    }
  }),

  SiteListControl: Backbone.View.extend({
    id: 'site-list-controls',
    template: '#site-index-ctrl-tmpl',

    initialize:function(options){
      this.listView = options.view;
    },

    render:function(){
      this.$el.html(this.template({
        groups: this.listView.collection.byCategory()
      }));

      return this;
    },

    events:{
      'click input[type="checkbox"]':function(ev){
        var parent = $(ev.target).parent();
        var ident = parent.data('site');

        var site = this.listView.collection.find(function(site){
          return site.id == ident;
        });

        site.set('visible', ev.target.checked);
      }
    }
  }),

  SiteListView: Backbone.View.extend({
    id: 'sites-index',
    template: '#site-index-tmpl',
    parent: '#page',

    initialize:function(collection){
      this.collection = collection;
      this.collection.on('reset', this.render, this);
    },

		render:function(){
			var groups = this.collection.byCategory();
			var tmpl = $(this.template());
			var list = tmpl.first();

			// init and render index controls
			var ctrl = new Juxtanews.SiteListControl({ view: this });
			this.$el.append(ctrl.render().el);

			// init and render each SiteListNode (Site model)
			_.each(groups, function(sites, name){
				_.each(sites, function(site){
					list.append(new Juxtanews.SiteListNode({ model: site }).render().el);
				}, this);
			}, this);

			this.$el.appendTo(this.parent).append(tmpl);
		}
	})
});

