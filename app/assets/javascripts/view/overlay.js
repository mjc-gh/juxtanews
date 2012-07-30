Juxtanews.extend({
	Overlay: Backbone.View({
		id: 'overlay',
		el: 'div',

		show:function(){
			return this.$el.appendTo('body');
		},

		remove:function(){
			return this.$el.remove();
		},

		events:{
			'click':function(){

			}
		}
	})
});
