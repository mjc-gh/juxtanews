Juxtanews.extend({
  Site: Backbone.Model.extend({
    idAttribute: 'ident',

    url: function(){
      return '/sites/'+ this.id +'.json';
    },

    initialize:function(){
      this.backoff = 0;
      this.on('change', function(){
        this.backoff = 0;
      });

      this.startTimer();
    },

    staleDelay:function(){
      var staleness = (Date.now() - +new Date(this.attributes.last_snapshot_at));

      if (staleness > STALE_THRESHOLD){
        return (STALE_DELAY * (this.backoff > 2 ? this.backoff : ++this.backoff));
      } else {
        return STALE_THRESHOLD - staleness;
      }
    },

    startTimer:function(){
      var model = this;

      clearTimeout(this.timer);

      this.timer = setTimeout(function(){
        model.refresh().done(function(){
          model.startTimer();
        });
      }, 5000); //this.staleDelay());
    },

    refresh:function(){
      var model = this;

      return this.fetch().done(function(){
        model.change();
      });
    }
  }),
});

Juxtanews.extend({
  SiteList: Backbone.Collection.extend({
    model: Juxtanews.Site,
    url: '/sites.json',

    _buildCategories:function(){
      this._byCategory = this.groupBy(function(site){
        return site.get('category');
      });
    },

    byCategory:function(){
      return _.clone(this._byCategory);
    },

    categories:function(){
      return _.keys(this._byCategory);
    },

    reset:function(){
      Backbone.Collection.prototype.reset.apply(this, arguments);

      this._buildCategories();
    },

    initialize:function(){
      this.on('add remove', this._buildCategories, this);
    }
  })
});
