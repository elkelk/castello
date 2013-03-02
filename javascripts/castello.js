// Generated by CoffeeScript 1.4.0
var Constants, Tile, TileTypes;

Constants = {
  features: {
    field: "field",
    road: "road",
    city: "city",
    cloister: "cloister",
    stop: "stop"
  }
};

TileTypes = {};

TileTypes.get = function(count, features, penants) {
  return {
    count: count,
    features: _.map(features, function(feature) {
      return Constants.features[feature];
    }),
    penants: penants
  };
};

TileTypes.three_sided_city = TileTypes.get(3, ["city", "city", "city", "city", "stop", "field", "stop", "city", "city"], []);

TileTypes.diagonal_city = TileTypes.get(3, ["stop", "city", "city", "city", "stop", "field", "field", "field", "stop"], []);

TileTypes.straight_city = TileTypes.get(1, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "city"], []);

TileTypes.double_half_city = TileTypes.get(3, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "field"], []);

TileTypes.half_city = TileTypes.get(5, ["stop", "city", "stop", "field", "field", "field", "field", "field", "field"], []);

TileTypes.t_road_city = TileTypes.get(3, ["stop", "road", "field", "road", "field", "road", "stop", "city", "stop"], []);

TileTypes.starter = TileTypes.get(4, ["stop", "city", "stop", "road", "field", "field", "field", "road", "road"], []);

TileTypes.straight_road = TileTypes.get(8, ["field", "road", "field", "field", "field", "road", "field", "field", "road"], []);

TileTypes.elbow_road = TileTypes.get(9, ["field", "road", "field", "road", "field", "field", "field", "field", "road"], []);

TileTypes.t_road = TileTypes.get(4, ["field", "road", "field", "road", "field", "road", "field", "field", "stop"], []);

TileTypes.cloister = TileTypes.get(4, ["field", "field", "field", "field", "field", "field", "field", "field", "cloister"], []);

TileTypes.cloister_road = TileTypes.get(2, ["field", "road", "field", "field", "field", "field", "field", "field", "cloister"], []);

TileTypes.penant_city = TileTypes.get(1, ["city", "city", "city", "city", "city", "city", "city", "city", "city"], [0]);

TileTypes.three_sided_penant_city = TileTypes.get(1, ["city", "city", "city", "city", "stop", "field", "stop", "city", "city"], [0]);

TileTypes.three_sided_road_city = TileTypes.get(1, ["city", "city", "city", "city", "stop", "road", "stop", "city", "city"], []);

TileTypes.three_sided_road_penant_city = TileTypes.get(2, ["city", "city", "city", "city", "stop", "road", "stop", "city", "city"], [0]);

TileTypes.diagonal_penant_city = TileTypes.get(2, ["stop", "city", "city", "city", "stop", "field", "field", "field", "stop"], [2]);

TileTypes.diagonal_elbow_city = TileTypes.get(3, ["stop", "city", "city", "city", "stop", "road", "field", "road", "road"], []);

TileTypes.diagonal_elbow_penant_city = TileTypes.get(3, ["stop", "city", "city", "city", "stop", "road", "field", "road", "road"], [2]);

TileTypes.straight_penant_city = TileTypes.get(2, ["stop", "city", "stop", "field", "stop", "city", "stop", "field", "city"], [1]);

TileTypes.diagonal_half_city = TileTypes.get(2, ["stop", "city", "stop", "city", "stop", "field", "field", "field", "stop"], []);

TileTypes.elbow_city_left = TileTypes.get(3, ["stop", "city", "stop", "field", "field", "road", "field", "road", "road"], []);

TileTypes.elbow_city_right = TileTypes.get(3, ["stop", "city", "stop", "road", "field", "road", "field", "field", "road"], []);

TileTypes.cross_road = TileTypes.get(1, ["field", "road", "field", "road", "field", "road", "field", "road", "stop"], []);

TileTypes.all = [TileTypes.three_sided_city, TileTypes.diagonal_city, TileTypes.straight_city, TileTypes.double_half_city, TileTypes.half_city, TileTypes.t_road_city, TileTypes.starter, TileTypes.straight_road, TileTypes.elbow_road, TileTypes.t_road, TileTypes.cloister, TileTypes.cloister_road, TileTypes.penant_city, TileTypes.three_sided_penant_city, TileTypes.three_sided_road_city, TileTypes.three_sided_road_penant_city, TileTypes.diagonal_penant_city, TileTypes.diagonal_elbow_city, TileTypes.diagonal_elbow_penant_city, TileTypes.diagonal_half_city, TileTypes.elbow_city_left, TileTypes.elbow_city_right, TileTypes.cross_road];

Tile = Backbone.Model.extend({
  defaults: {
    definition: TileTypes.starter,
    position_x: 0,
    position_y: 0,
    placed: false,
    canvas: "#main_canvas"
  },
  initialize: function() {},
  place: function(x, y) {
    return this.set({
      position_x: x,
      position_y: y
    });
  },
  place_player: function(color, index) {
    return this.set({
      player_on: index,
      player_color: color
    });
  },
  feature: function(index) {
    return this.get("definition").features[index];
  },
  draw: function() {
    this.draw_tile();
    this.draw_city();
    return this.draw_road();
  },
  draw_tile: function() {
    return $(this.get("canvas")).drawRect({
      fillStyle: "#336600",
      x: this.get("position_x"),
      y: this.get("position_y"),
      width: 100,
      height: 100,
      fromCenter: false
    });
  },
  draw_city: function() {
    _.each([8], function(feature) {
      if (this.feature(feature) === Constants.features.city) {
        return this.draw_city_middle(feature, true);
      }
    }, this);
    _.each([1, 3, 5, 7], function(feature) {
      if (this.feature(feature) === Constants.features.city) {
        return this.draw_city_side(feature);
      }
    }, this);
    return _.each([0, 2, 4, 6, 8], function(feature) {
      if (this.feature(feature) === Constants.features.city) {
        return this.draw_city_middle(feature);
      }
    }, this);
  },
  draw_city_side: function(feature) {
    var cx1, cx2, cy1, cy2, long, short, x1, x2, y1, y2, _ref;
    short = 20;
    long = 100 - short;
    _ref = (function() {
      switch (feature) {
        case 1:
          return [0, 0, short, 50, long, 50, 100, 0];
        case 3:
          return [100, 0, 50, short, 50, long, 100, 100];
        case 5:
          return [0, 100, short, 50, long, 50, 100, 100];
        case 7:
          return [0, 0, 50, short, 50, long, 0, 100];
      }
    })(), x1 = _ref[0], y1 = _ref[1], cx1 = _ref[2], cy1 = _ref[3], cx2 = _ref[4], cy2 = _ref[5], x2 = _ref[6], y2 = _ref[7];
    return $(this.get("canvas")).drawBezier({
      fillStyle: "#663300",
      strokeStyle: "#000",
      strokeWidth: "5",
      x1: x1 + this.get("position_x"),
      y1: y1 + this.get("position_y"),
      cx1: cx1 + this.get("position_x"),
      cy1: cy1 + this.get("position_y"),
      cx2: cx2 + this.get("position_x"),
      cy2: cy2 + this.get("position_y"),
      x2: x2 + this.get("position_x"),
      y2: y2 + this.get("position_y")
    });
  },
  draw_city_middle: function(feature, stroke) {
    var height, size, width, x, y, _ref;
    if (stroke == null) {
      stroke = false;
    }
    size = 35;
    _ref = (function() {
      switch (feature) {
        case 0:
          return [0, 0, size, size];
        case 2:
          return [100 - size, 0, size, size];
        case 4:
          return [100 - size, 100 - size, size, size];
        case 6:
          return [0, 100 - size, size, size];
        case 8:
          return [30, 30, 40, 40];
      }
    })(), x = _ref[0], y = _ref[1], width = _ref[2], height = _ref[3];
    return $(this.get("canvas")).drawRect({
      fillStyle: "#663300",
      x: x + this.get("position_x"),
      y: y + this.get("position_y"),
      width: width,
      height: height,
      fromCenter: false,
      strokeStyle: stroke ? "#000" : void 0,
      strokeWidth: stroke ? "5" : void 0
    });
  },
  draw_road: function() {
    return _.each([1, 3, 5, 7, 8], function(feature) {
      if (this.feature(feature) === Constants.features.road) {
        return this.draw_road_part(feature);
      }
    }, this);
  },
  draw_road_part: function(feature) {
    var height, width, x, y, _ref;
    _ref = (function() {
      switch (feature) {
        case 1:
          return [45, 0, 10, 45];
        case 3:
          return [55, 45, 45, 10];
        case 5:
          return [45, 55, 10, 45];
        case 7:
          return [0, 45, 45, 10];
        case 8:
          return [45, 45, 10, 10];
      }
    })(), x = _ref[0], y = _ref[1], width = _ref[2], height = _ref[3];
    return $(this.get("canvas")).drawRect({
      fillStyle: "#fff",
      x: x + this.get("position_x"),
      y: y + this.get("position_y"),
      width: width,
      height: height,
      fromCenter: false
    });
  },
  feature_continues: function(index, direction) {
    var adjacent_city, adjacent_field, center_same, feature, feature_continues, neighboring_field, opposite, opposite_neighboring_field;
    if (direction == null) {
      direction = null;
    }
    feature_continues = false;
    feature = this.feature(index);
    if (this.feature_is_side(index)) {
      opposite = this.opposite_feature(index);
      center_same = feature === this.center_feature();
      feature_continues = center_same && feature === opposite;
      feature_continues || (feature_continues = _.include(this.neighboring_features(index), feature));
      feature_continues || (feature_continues = _.include(this.adjacent_features(index), feature) && center_same);
      if (feature === Constants.features.road) {
        neighboring_field = this.neighboring_feature(index, direction) === Constants.features.field;
        adjacent_field = this.adjacent_feature(direction) === Constants.features.field;
        opposite_neighboring_field = this.neighboring_feature(this.opposite_feature_index(index), direction) === Constants.features.field;
        feature_continues || (feature_continues = neighboring_field && adjacent_field && opposite_neighboring_field);
        adjacent_city = this.adjacent_feature(direction) === Constants.features.city;
        feature_continues || (feature_continues = adjacent_city && opposite !== Constants.features.city);
      }
    }
    return feature_continues;
  },
  feature_is_side: function(index) {
    return _.include([1, 3, 5, 7], index);
  },
  feature_is_corner: function(index) {
    return _.include([0, 2, 4, 6], index);
  },
  center_feature: function() {
    return this.feature(8);
  },
  neighboring_features: function(index) {
    return this._get_surrounding_features(index, 1);
  },
  neighboring_feature: function(index, direction) {
    var location;
    location = (function() {
      switch (direction) {
        case "north":
          if (index === 3) {
            return 2;
          } else {
            return 0;
          }
          break;
        case "east":
          if (index === 1) {
            return 2;
          } else {
            return 4;
          }
          break;
        case "south":
          if (index === 3) {
            return 4;
          } else {
            return 6;
          }
          break;
        case "west":
          if (index === 1) {
            return 0;
          } else {
            return 6;
          }
      }
    })();
    return this.feature(location);
  },
  adjacent_features: function(index) {
    return this._get_surrounding_features(index, 2);
  },
  adjacent_feature: function(direction) {
    var location;
    location = (function() {
      switch (direction) {
        case "north":
          return location = 1;
        case "east":
          return location = 3;
        case "south":
          return location = 5;
        case "west":
          return location = 7;
      }
    })();
    return this.feature(location);
  },
  opposite_feature: function(index) {
    return this.feature(this.opposite_feature_index(index));
  },
  opposite_feature_index: function(index) {
    return this._normalize_feature_index(index + 4);
  },
  _get_surrounding_features: function(index, distance) {
    var left_index, right_index;
    left_index = this._normalize_feature_index(index - distance);
    right_index = this._normalize_feature_index(index + distance);
    return [this.feature(left_index), this.feature(right_index)];
  },
  _normalize_feature_index: function(index) {
    if (index > 7) {
      index = index - 8;
    }
    if (index < 0) {
      index = 8 + index;
    }
    return index;
  }
});

(function() {
  return _.each(TileTypes.all, function(type, index) {
    var x, y;
    x = 110 * (index % 8);
    y = parseInt((110 * index) / 880) * 110;
    return (new Tile({
      definition: type,
      position_x: x,
      position_y: y
    })).draw();
  });
})();
