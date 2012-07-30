Juxtanews.extend({
	Snapshot: Backbone.Model.extend({
		url:function(){
			return '/sites/'+ this.site_id +'/snapshots/'+ this.id +'.json';
		},

		initialize:function(site){
			this.site_id = site.id;
			this.id = site.attributes.last_snapshot_id;
		}
	})
});
