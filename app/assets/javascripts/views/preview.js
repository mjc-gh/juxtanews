// Used to view a given Snapshot (under a specific Site)
Juxtanews.extend({
  Preview: Backbone.View.extend({
    model: Juxtanews.Snapshot,
    template: '#snapshot-preview-tmpl',

    className: 'snapshot preview',
    tagName: 'div',

    initialize:function(){
      this.model.on('change', this.render, this);
    },

    render:function(){
      if (!this.template.call)
        this.template = Juxtanews.tmpl(this.template);

      var html = this.template(_.extend({
        site_url: this.model.site.attributes.url,
        site_name: this.model.site.attributes.name
      }, this.model.attributes));

      this.$el.html(html).appendTo('body').centerTo(window);

      this.overlay = new Juxtanews.Overlay();
      this.overlay.show().on('close', this.close, this);

      $(document).on('keydown', this, this.keyHandler);
      $(window).on('resize', this.$el, function(ev){
        ev.data.centerTo(this);
      });

      return this;
    },

    close:function(){
      $(document).off('keydown', this.keyHandler);

      this.overlay.remove();
      this.remove().trigger('close');
    },

    keyHandler:function(ev){
      if (ev.keyCode == 27)
        ev.data.close();
    },

    remove:function(){
      this.$el.fadeOut(300, function(){ $(this).remove(); });
      return this;
    },

    events: {
      'click a[data-action="close"]': function(){
        this.close();
      },

      'click a[data-action="open"]': function(){
        window.open(this.model.attributes.original, '_blank');
      }
    }
  })
});


