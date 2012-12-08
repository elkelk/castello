TileTypes = {}

TileTypes.get = function(features){
  return _.map(features, function(feature){
    return Constants.features[feature];
  });
}

TileTypes.starter = TileTypes.get([
  "city",  "city",  "city",
  "field", "road",  "field",
  "field", "field", "field",
  "field", "road",  "field",
  "road"
]);

TileTypes.diagonal_city = TileTypes.get([
  "city",  "city",  "city",
  "city",  "city",  "city",
  "field", "field", "field",
  "field", "field", "field",
  "field"
]);

TileTypes.straight_city = TileTypes.get([
  "city",  "city",  "city",
  "field", "field", "field",
  "city",  "city",  "city",
  "field", "field", "field",
  "city"
]);

TileTypes.half_city = TileTypes.get([
  "city",  "city",  "city",
  "field", "field", "field",
  "field", "field", "field",
  "field", "field", "field",
  "field"
]);

TileTypes.double_half_city = TileTypes.get([
  "city",  "city",  "city",
  "field", "field", "field",
  "city",  "city",  "city",
  "field", "field", "field",
  "field"
]);

TileTypes.three_sided_city = TileTypes.get([
  "city",  "city",  "city",
  "city",  "city",  "city",
  "city",  "city",  "city",
  "field", "field", "field",
  "city"
]);

TileTypes.elbow_road = TileTypes.get([
  "field", "road", "field",
  "field", "road", "field",
  "field", "field", "field",
  "field", "field", "field",
  "road"
]);

TileTypes.straight_road = TileTypes.get([
  "field", "road", "field",
  "field", "field", "field",
  "field", "road", "field",
  "field", "field", "field",
  "road"
]);

TileTypes.t_road = TileTypes.get([
  "field", "road", "field",
  "field", "road", "field",
  "field", "road", "field",
  "field", "field", "field",
  "stop"
]);
