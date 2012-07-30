Juxtanews.extend({
	Preview: Backbone.View.extend({
		model: Juxtanews.Snapshot,
		template: '#site-pane-tmpl',

		className: 'preview',
		tagName: 'div',

		initialize:function(){
			this.model.on('change', this.render, this);
		},

		render:function(){
			if (!this.template.call)
				this.template = Juxtanews.tmpl(this.template);

			var html = this.template((this.model.attributes));
			this.$el.html(html).appendTo('body');

			this.overlay.show().on('click', this.close);
			this.position();

			return this;
		},

		position:function(){
			var win = $(window);

			this.$el.css({
				top: (win.height() / 2) - (this.$el.height() / 2),
				left: (win.width() / 2) - (this.$el.width() / 2)
			});
		},

		close:function(){
			this.$el.remove();
			this.overlay.off('click', this.close).hide();
		},

		events: {
			'click a[data-action="close"]': function(){
				this.close();
			}
		}
	})
});


