Tile = Backbone.Model.extend(
  defaults:
    features: TileTypes.starter
    position_x: 0
    position_y: 0
    placed: false

  initialize: ->

  place: (x, y) ->
    @set
      position_x: x
      position_y: y


  place_player: (color, feature_index) ->
    @set
      player_on: feature_index
      player_color: color


  feature_end: (feature_index) ->
    that = this
    feature_end = true
    feature = @get("features")[feature_index]
    side = @feature_side(feature_index)
    if feature is Constants.features.city
      if side is "north"
        _.each _.union(Tile.east(), Tile.west()), (test_index) ->
          feature_end = false  if feature is that.get("features")[test_index]

    feature_end

  feature_side: (feature_index) ->
    side = "center"
    side = (if _.include(Tile.north(), feature_index) then "north" else side)
    side = (if _.include(Tile.east(), feature_index) then "east" else side)
    side = (if _.include(Tile.west(), feature_index) then "south" else side)
    side = (if _.include(Tile.south(), feature_index) then "west" else side)
    side
)
Tile.north = ->
  [0, 1, 2]

Tile.east = ->
  [3, 4, 5]

Tile.south = ->
  [6, 7, 8]

Tile.west = ->
  [9, 10, 11]

Tile.center = ->
  [12]
