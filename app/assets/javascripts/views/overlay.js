// Modal overlay
Juxtanews.extend({
  Overlay: Backbone.View.extend({
    id: 'overlay',

    show:function(){
      this.$el.appendTo('body');
      return this;
    },

    remove:function(){
      this.$el.fadeOut(350, function(){ $(this).remove(); });
      return this;
    },

    events:{
      'click':function(){
        this.trigger('close');
        this.remove();
      }
    }
  })
});
