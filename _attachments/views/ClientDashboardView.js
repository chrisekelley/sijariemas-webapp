var ClientDashboardView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClientDashboardView = (function(_super) {
  __extends(ClientDashboardView, _super);

  function ClientDashboardView() {
    this.render = __bind(this.render, this);
    return ClientDashboardView.__super__.constructor.apply(this, arguments);
  }

  ClientDashboardView.prototype.tagName = 'p';

  ClientDashboardView.prototype.render = function() {
    if (!this.model) {
      return this.$el.html(polyglot.t("Error") + ": " + polyglot.t("NoClientLoaded") + ".");
    } else {
      return this.$el.html(this.model.get("firstNames") + " " + this.model.get("surname") + "<br/>" + polyglot.t(this.model.get("Gender")) + " " + polyglot.t(this.model.get("DOB")));
    }
  };

  return ClientDashboardView;

})(Backbone.View);
