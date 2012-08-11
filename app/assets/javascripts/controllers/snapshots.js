(function(c, app){
	var back_action;

	c.on('snapshots:show', function(site_id, id){
		var site = Juxtanews.sites.get(site_id);

		var snapshot = new Juxtanews.Snapshot(site, id);
		var preview = new Juxtanews.Preview({ model: snapshot });

		snapshot.fetch();

		preview.on('close', function(){
			//c.trigger.call(c, back_action, back_action );
			//c.trigger(':back');
		});
	});
}(Juxtanews.controllers, Juxtanews.app));
