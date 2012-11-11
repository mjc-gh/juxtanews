Juxtanews.extend({
  SiteView: Backbone.View.extend({
    id: 'sites-view',
    tagName: 'ul',

    template: '#site-view-tmpl',
    parent: '#page',

    initialize:function(snapshots){
      this.snapshots = snapshots;
      this.snapshots.on('reset', this.render, this);
    },

    render:function(){
      if (!this.template.call)
        this.template = Juxtanews.tmpl(this.template);

      var models = this.snapshots.models;
      var snapshots = _.map(models, function(s){ return s.attributes });

      this.$el.html(this.template({ snapshots: snapshots })).appendTo(this.parent);
    },

    events: {
      'click img': function(ev){
        var site_id = this.snapshots.site.id;
        var id = $(ev.target).data('id');

        Juxtanews.controllers.trigger('snapshots:show', site_id, id);
      }
    }
  })
});
