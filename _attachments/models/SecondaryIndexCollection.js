var SecondaryIndexCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SecondaryIndexCollection = (function(_super) {
  __extends(SecondaryIndexCollection, _super);

  function SecondaryIndexCollection() {
    return SecondaryIndexCollection.__super__.constructor.apply(this, arguments);
  }

  SecondaryIndexCollection.prototype.model = Result;

  SecondaryIndexCollection.prototype.url = '/result';

  SecondaryIndexCollection.prototype.parse = function(result) {
    return _.pluck(result.rows, 'doc');
  };

  return SecondaryIndexCollection;

})(Backbone.Collection);
