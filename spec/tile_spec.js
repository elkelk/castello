describe("Tile", function(){
  afterEach(function(){
    $("#main_canvas").clearCanvas();
  });
  describe("#feature_end", function(){
    it("can tell you if a city is connected to an adjacent side of the tile", function() {
      tile = new Tile({features: TileTypes.diagonal_city});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a city is connected to a parallel side of the tile", function() {
      tile = new Tile({features: TileTypes.straight_city});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a city is not connected to another side of the tile", function() {
      tile = new Tile({features: TileTypes.half_city});
      expect(tile.feature_end(0)).toBe(true);
    });

    it("can tell you if a field is connected to an adjacent side of the tile", function() {
      tile = new Tile({features: TileTypes.diagonal_city});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a field is connected to a parallel side of the tile", function() {
      tile = new Tile({features: TileTypes.double_half_city});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a field is not connected to another side of the tile", function() {
      tile = new Tile({features: TileTypes.three_sided_city});
      expect(tile.feature_end(0)).toBe(true);
    });

    it("can tell you if a road is connected to an adjacent side of the tile", function() {
      tile = new Tile({features: TileTypes.elbow_road});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a road is connected to a parallel side of the tile", function() {
      tile = new Tile({features: TileTypes.straight_road});
      expect(tile.feature_end(0)).toBe(false);
    });

    it("can tell you if a road is not connected to another side of the tile", function() {
      tile = new Tile({features: TileTypes.t_road});
      expect(tile.feature_end(0)).toBe(true);
    });
  });
});
