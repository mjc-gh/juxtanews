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
				//console.log('view all', arguments, this);
				//this.model
			},

			'click img':function(){
				var snapshot = new Juxtanews.Snapshot(this.model);
				this.preview = new Juxtanews.Preview({model: snapshot});

				snapshot.fetch();
			}
		}
	}),

	SiteListView: Backbone.View.extend({
		el: '#sites-list',

		initialize:function(sites){
			this.sites = sites;
			this.sites.on('reset', this.render, this);
		},

		render:function(){
			var list = this.$el;

			if (list.is(':empty')){
				this.sites.each(function(site){
					var node = new Juxtanews.SiteListNode({ model: site });

					list.append(node.render().el);
				});
			}
		}
	})
});

