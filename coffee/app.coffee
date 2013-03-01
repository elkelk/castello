(->
  _.each(TileTypes.all, (type, index) ->
    x = 110 * (index % 8)
    y = parseInt((110 * index) / 880) * 110

    (new Tile(features: type, position_x: x, position_y: y)).draw()
  )
)()
