function Feature(){
};


Feature.prototype = {
  _create_get_or_set: function(name){
    return function(value){
      if(value === undefined){
        return this["_" + name];
      } else {
        this["_" + name] = value;
      }
    };
  }
};

