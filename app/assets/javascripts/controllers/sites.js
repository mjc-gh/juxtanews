(function(c){
	var list_view, site_view, snapshots;

	c.on('sites:index', function(){
		if (!list_view){
			list_view = new Juxtanews.SiteListView(Juxtanews.sites);
			list_view.render();

		} else if (list_view && !list_view.$el.is(':visible')) {
			list_view.$el.show();
		}

		if (site_view){
			site_view.remove();
			site_view = null;
		}
	});

	c.on('sites:show', function(site_id){
		if (list_view)
			list_view.$el.hide();

		if (site_view && site_view.snapshots != snapshots){
			site_view.remove();
			snapshots = null;
			site_view = null;
		}

		if (!site_view){
			snapshots = new Juxtanews.SnapshotList(Juxtanews.sites.get(site_id));
			site_view = new Juxtanews.SiteView(snapshots);

			snapshots.fetch();
		}
	});

}(Juxtanews.controllers));
