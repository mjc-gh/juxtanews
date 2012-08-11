// index page site list (enumerates all sites from Collection)
Juxtanews.extend({
	SiteListNode: Backbone.View.extend({
		model: Juxtanews.Site,

		template: '#site-node-tmpl',
		tagName: 'li',

		initialize:function(options){
			this.model.on('change', this.render, this);
		},

		render: function(){
			if (!this.template.call)
				this.template = Juxtanews.tmpl(this.template);

			if (this.$el.is(':empty')){
				this.$el.html(this.template(this.model.attributes));

				this.$el.img = this.$el.find('img');
				this.$el.time = this.$el.find('strong');

			} else {
				var attributes = this.model.attributes;

				var time = this.$el.time.fadeOut(250, function(){
					time.text(ld(attributes.last_snapshot_at)).fadeIn(250).addClass('blink')
					// remove blink class after 5 seconds
					time.animate({_:0}, 5000, function(){ $(this).removeClass('blink'); });
				});

				var imgEl = this.$el.img.fadeOut(250, function(){
					var img = new Image;
					img.src = attributes.last_snapshot_preview;

					$(img).on('load', function(){
						imgEl.prop('src', img.src).fadeIn(250);
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

	SiteListView: Backbone.View.extend({
		id: 'sites-list',
		tagName: 'ul',

		parent: '#page .content',

		initialize:function(sites){
			this.sites = sites;
			this.sites.on('reset', this.render, this);
		},

		render:function(){
			var list = this.$el.appendTo(this.parent);

			this.sites.each(function(site){
				var node = new Juxtanews.SiteListNode({ model: site });

				list.append(node.render().el);
			});
		}
	})
});

$(document).on('error', 'img', function(){
	console.log('error', this);
});
