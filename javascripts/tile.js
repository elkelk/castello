Tile = Backbone.Model.extend({
  defaults: {
    features: TileTypes.starter,
    position_x: 0,
    position_y: 0,
    placed: false
  },

  initialize: function(){
  },

  place: function(x, y){
    this.set({position_x: x, position_y: y});
  },

  place_player: function(color, feature_index){
    this.set({player_on: feature_index, player_color: color});
  },

  feature_end: function(feature_index){
    var that = this;
    var feature_end = true;
    var feature = this.get("features")[feature_index];
    var side = this.feature_side(feature_index);
    if(feature===Constants.features.city){
      if(side==="north"){
        _.each(_.union(Tile.east(), Tile.west()), function(test_index){
          if(feature===that.get("features")[test_index]) feature_end = false;
        });
      }
    }
    return feature_end;
  },

  feature_side: function(feature_index){
    var side = "center";
    side = _.include(Tile.north(), feature_index) ? "north" : side;
    side = _.include(Tile.east(),  feature_index) ? "east"  : side;
    side = _.include(Tile.west(),  feature_index) ? "south" : side;
    side = _.include(Tile.south(), feature_index) ? "west"  : side;
    return side;
  },
});

Tile.north   = function(){ return [0, 1, 2] }
Tile.east    = function(){ return [3, 4, 5] }
Tile.south   = function(){ return [6, 7, 8] }
Tile.west    = function(){ return [9, 10, 11]}
Tile.center  = function(){ return [12] }

