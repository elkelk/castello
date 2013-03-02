TileTypes = {}
TileTypes.get = (count, features, penants) ->
  {
    count: count
    features: _.map features, (feature) -> Constants.features[feature]
    penants: penants
  }

# tiles are defined by: [top-left, top-middle, top-right, right, bottom-right, bottom, bottom-left, left, center]

TileTypes.three_sided_city =             TileTypes.get(3, ["city", "city", "city", "city", "stop", "field", "stop", "city", "city"], [])
TileTypes.diagonal_city =                TileTypes.get(3, ["stop", "city", "city", "city", "stop", "field", "field", "field", "stop"], [])
TileTypes.straight_city =                TileTypes.get(1, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "city"], [])
TileTypes.double_half_city =             TileTypes.get(3, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "field"], [])
TileTypes.half_city =                    TileTypes.get(5, ["stop", "city", "stop", "field", "field", "field", "field", "field", "field"], [])
TileTypes.t_road_city =                  TileTypes.get(3, ["stop", "road", "field", "road", "field", "road", "stop", "city", "stop"], [])
TileTypes.starter =                      TileTypes.get(4, ["stop", "city", "stop", "road", "field", "field", "field", "road", "road"], [])
TileTypes.straight_road =                TileTypes.get(8, ["field", "road", "field", "field", "field", "road", "field", "field", "road"], [])
TileTypes.elbow_road =                   TileTypes.get(9, ["field", "road", "field", "road", "field", "field", "field", "field", "road"], [])
TileTypes.t_road =                       TileTypes.get(4, ["field", "road", "field", "road", "field", "road", "field", "field", "stop"], [])
TileTypes.cloister =                     TileTypes.get(4, ["field", "field", "field", "field", "field", "field", "field", "field", "cloister"], [])
TileTypes.cloister_road =                TileTypes.get(2, ["field", "road", "field", "field", "field", "field", "field", "field", "cloister"], [])
TileTypes.penant_city =                  TileTypes.get(1, ["city", "city", "city", "city", "city", "city", "city", "city", "city"], [ 0 ])
TileTypes.three_sided_penant_city =      TileTypes.get(1, ["city", "city", "city", "city", "stop", "field", "stop", "city", "city"], [ 0 ])
TileTypes.three_sided_road_city =        TileTypes.get(1, ["city", "city", "city", "city", "stop", "road", "stop", "city", "city"], [])
TileTypes.three_sided_road_penant_city = TileTypes.get(2, ["city", "city", "city", "city", "stop", "road", "stop", "city", "city"], [ 0 ])
TileTypes.diagonal_penant_city =         TileTypes.get(2, ["stop", "city", "city", "city", "stop", "field", "field", "field", "stop"], [ 2 ])
TileTypes.diagonal_elbow_city =          TileTypes.get(3, ["stop", "city", "city", "city", "stop", "road", "field", "road", "road"], [])
TileTypes.diagonal_elbow_penant_city =   TileTypes.get(3, ["stop", "city", "city", "city", "stop", "road", "field", "road", "road"], [ 2 ])
TileTypes.straight_penant_city =         TileTypes.get(2, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "city"], [ 1 ])
TileTypes.diagonal_half_city =           TileTypes.get(2, ["stop", "city", "stop", "city", "stop", "field", "field", "field", "stop"], [])
TileTypes.elbow_city_left =              TileTypes.get(3, ["stop", "city", "stop", "field", "field", "road", "field", "road", "road"], [])
TileTypes.elbow_city_right =             TileTypes.get(3, ["stop", "city", "stop", "road", "field", "road", "field", "field", "road"], [])
TileTypes.cross_road =                   TileTypes.get(1, ["field", "road", "field", "road", "field", "road", "field", "road", "stop"], [])

TileTypes.all = [
  TileTypes.three_sided_city,
  TileTypes.diagonal_city,
  TileTypes.straight_city,
  TileTypes.double_half_city,
  TileTypes.half_city,
  TileTypes.t_road_city,
  TileTypes.starter,
  TileTypes.straight_road,
  TileTypes.elbow_road,
  TileTypes.t_road,
  TileTypes.cloister,
  TileTypes.cloister_road,
  TileTypes.penant_city,
  TileTypes.three_sided_penant_city,
  TileTypes.three_sided_road_city,
  TileTypes.three_sided_road_penant_city,
  TileTypes.diagonal_penant_city,
  TileTypes.diagonal_elbow_city,
  TileTypes.diagonal_elbow_penant_city,
  TileTypes.diagonal_half_city,
  TileTypes.elbow_city_left,
  TileTypes.elbow_city_right,
  TileTypes.cross_road
]
