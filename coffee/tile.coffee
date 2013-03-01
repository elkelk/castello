Tile = Backbone.Model.extend(
  defaults:
    features: TileTypes.starter
    position_x: 0
    position_y: 0
    placed: false
    canvas: "#main_canvas"

  initialize: ->

  place: (x, y) ->
    @set
      position_x: x
      position_y: y

  place_player: (color, index) ->
    @set
      player_on: index
      player_color: color

  feature: (index) ->
    @get("features")[index]

  draw: ->
    @draw_tile()
    @draw_city()

  draw_tile: ->
    $(@get("canvas")).drawRect(
      fillStyle: "#000"
      x: @get("position_x")
      y: @get("position_y")
      width: 100
      height: 100
      fromCenter: false
    )

  draw_city_part: (side) ->
    [ start, end, x, y ] = switch side
      when 1
        [ -Math.PI/2, Math.PI/2, 50, 0 ]
      when 3
        [ 0, Math.PI, 100, 50 ]
      when 5
        [ Math.PI/2, -Math.PI/2, 50, 100 ]
      when 7
        [ Math.PI, 0, 0, 50 ]

    $(@get("canvas")).drawArc(
        fillStyle: "brown"
        x: x + @get("position_x")
        y: y + @get("position_y")
        radius: 50
        start: start
        end: end
        ccw: true
        inDegrees: false
    )

  draw_city: ->
    _.each [1,3,5,7], (side) ->
      if @feature(side) is Constants.features.city
        @draw_city_part side
    , this

  feature_continues: (index, direction = null) ->
    feature_continues = false
    feature = @feature(index)
    if @feature_is_side(index)
      opposite = @opposite_feature(index)
      center_same = feature == @center_feature()
      feature_continues = center_same && feature == opposite
      feature_continues or= _.include(@neighboring_features(index), feature)
      feature_continues or= _.include(@adjacent_features(index), feature) && center_same

      # check for fields surrounding roads
      if feature is Constants.features.road
        neighboring_field = @neighboring_feature(index, direction) is Constants.features.field
        adjacent_field = @adjacent_feature(direction) is Constants.features.field
        opposite_neighboring_field = @neighboring_feature(@opposite_feature_index(index), direction) is Constants.features.field
        feature_continues or= neighboring_field && adjacent_field && opposite_neighboring_field

        adjacent_city = @adjacent_feature(direction) is Constants.features.city
        feature_continues or= adjacent_city && opposite isnt Constants.features.city

    feature_continues

  feature_is_side: (index) ->
    _.include [1,3,5,7], index

  feature_is_corner: (index) ->
    _.include [0,2,4,6], index

  center_feature: ->
    @feature(8)

  neighboring_features: (index) ->
    @_get_surrounding_features(index, 1)

  neighboring_feature: (index, direction) ->
    location = switch direction
      when "north"
        if (index==3)
          2
        else
          0
      when "east"
        if (index==1)
          2
        else
          4
      when "south"
        if (index==3)
          4
        else
          6
      when "west"
        if (index==1)
          0
        else
          6
    @feature(location)

  adjacent_features: (index) ->
    @_get_surrounding_features(index, 2)

  adjacent_feature: (direction) ->
    location = switch direction
      when "north" then location = 1
      when "east"  then location = 3
      when "south" then location = 5
      when "west"  then location = 7
    @feature(location)

  opposite_feature: (index) ->
    @feature @opposite_feature_index(index)

  opposite_feature_index: (index) ->
    @_normalize_feature_index(index + 4)

  _get_surrounding_features: (index, distance) ->
    left_index = @_normalize_feature_index(index - distance)
    right_index = @_normalize_feature_index(index + distance)
    [@feature(left_index), @feature(right_index)]

  _normalize_feature_index: (index) ->
    index = index - 8 if index > 7
    index = 8 + index if index < 0
    index
)
