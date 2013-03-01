TileTypes = {}
TileTypes.get = (features) ->
  _.map features, (feature) ->
    Constants.features[feature]


# tiles are defined by: [top-left, top-middle, top-right, right, bottom-right, bottom, bottom-left, left, center]
TileTypes.starter = TileTypes.get(["stop", "city", "stop", "road", "field", "field", "field", "road", "road"])
TileTypes.diagonal_city = TileTypes.get(["stop", "city", "city", "city", "stop", "field", "field", "field", "stop"])
TileTypes.straight_city = TileTypes.get(["stop", "city", "stop", "field", "stop", "city", "stop", "field", "city"])
TileTypes.half_city = TileTypes.get(["stop", "city", "stop", "field", "field", "field", "field", "field", "field"])
TileTypes.double_half_city = TileTypes.get(["stop", "city", "stop", "field", "stop", "city", "stop", "field", "field"])
TileTypes.three_sided_city = TileTypes.get(["city", "city", "city", "city", "stop", "field", "stop", "city", "city"])
TileTypes.elbow_road = TileTypes.get(["field", "road", "field", "road", "field", "field", "field", "field", "road"])
TileTypes.straight_road = TileTypes.get(["field", "road", "field", "field", "field", "road", "field", "field", "road"])
TileTypes.t_road = TileTypes.get(["field", "road", "field", "road", "field", "road", "field", "field", "stop"])
TileTypes.t_road_city = TileTypes.get(["stop", "road", "field", "road", "field", "road", "stop", "city", "stop"])

TileTypes.all = [
  TileTypes.starter,
  TileTypes.diagonal_city,
  TileTypes.straight_city,
  TileTypes.half_city,
  TileTypes.double_half_city,
  TileTypes.three_sided_city,
  TileTypes.elbow_road,
  TileTypes.straight_road,
  TileTypes.t_road,
  TileTypes.t_road_city
]
