describe "Tile", ->
  afterEach ->
    $("#main_canvas").clearCanvas()

  describe "#feature_continues", ->

    describe "cities", ->

      it "can tell you if a city is connected to an adjacent side of the tile", ->
        tile = new Tile(definition: TileTypes.diagonal_city)
        expect(tile.feature_continues(1)).toBe true

      it "can tell you if a city is connected to a parallel side of the tile", ->
        tile = new Tile(definition: TileTypes.straight_city)
        expect(tile.feature_continues(1)).toBe true

      it "can tell you if a city is not connected to another side of the tile", ->
        tile = new Tile(definition: TileTypes.half_city)
        expect(tile.feature_continues(1)).toBe false

    describe "fields", ->

      it "can tell you if a field is connected to an adjacent side of the tile", ->
        tile = new Tile(definition: TileTypes.diagonal_city)
        expect(tile.feature_continues(1)).toBe true

      it "can tell you if a field is connected to a parallel side of the tile", ->
        tile = new Tile(definition: TileTypes.double_half_city)
        expect(tile.feature_continues(3)).toBe true

      it "can tell you if a field is not connected to another side of the tile", ->
        tile = new Tile(definition: TileTypes.three_sided_city)
        expect(tile.feature_continues(5)).toBe false

      it "can tell you if a field is connected to another side of the tile when the edge is a continuous road", ->
        tile = new Tile(definition: TileTypes.starter)
        expect(tile.feature_continues(3, "north")).toBe true

      it "can tell you if a field is connected to another side of the tile when the edge is a road that stops", ->
        tile = new Tile(definition: TileTypes.t_road)
        expect(tile.feature_continues(1, "west")).toBe true

      it "can tell you if a field is connected to another side of the tile when the edge is a road that stops next to a city", ->
        tile = new Tile(definition: TileTypes.t_road_city)
        expect(tile.feature_continues(1, "west")).toBe true

    describe "roads", ->

      it "can tell you if a road is connected to an adjacent side of the tile", ->
        tile = new Tile(definition: TileTypes.elbow_road)
        expect(tile.feature_continues(1)).toBe true

      it "can tell you if a road is connected to a parallel side of the tile", ->
        tile = new Tile(definition: TileTypes.straight_road)
        expect(tile.feature_continues(1)).toBe true

      it "can tell you if a road is not connected to another side of the tile", ->
        tile = new Tile(definition: TileTypes.t_road)
        expect(tile.feature_continues(1)).toBe false
