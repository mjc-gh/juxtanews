Juxtanews.extend({
	Snapshot: Backbone.Model.extend({
		url:function(){
			return '/sites/'+ this.site.id +'/snapshots/'+ this.id +'.json';
		},

		initialize:function(site, id){
			this.site = site;
			this.id = id;
		}
	}),
});

Juxtanews.extend({
	SnapshotList: Backbone.Collection.extend({
		url:function(){
			return '/sites/'+ this.site.id +'/snapshots.json';
		},

		initialize:function(site){
			this.site = site;
		}

		// TODO setup auto refresh
	})
});
