(function(c, app){
    var preview, back_action;

    c.on('snapshots:show', function(site_id, id){
        if (!preview){
            var site = Juxtanews.sites.get(site_id);

            var snapshot = new Juxtanews.Snapshot(site, id);
            preview = new Juxtanews.Preview({ model: snapshot });

            snapshot.fetch();
        }

        preview.on('close', function(){
            preview = undefined;
            c.back();
        });
    });

    // catch history.back and destroy view
    c.on('sites:index, sites:show', function(){
        if (preview) preview.close();
    });

}(Juxtanews.controllers, Juxtanews.app));
