// Generated by CoffeeScript 1.6.3
var ReportHeaderDashboardView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ReportHeaderDashboardView = (function(_super) {
  __extends(ReportHeaderDashboardView, _super);

  function ReportHeaderDashboardView() {
    this.displayUserRegistrationForm = __bind(this.displayUserRegistrationForm, this);
    this.render = __bind(this.render, this);
    _ref = ReportHeaderDashboardView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ReportHeaderDashboardView.prototype.tagName = 'p';

  ReportHeaderDashboardView.prototype.events = {
    "click #newPatient": "displayUserRegistrationForm"
  };

  ReportHeaderDashboardView.prototype.render = function() {
    return this.$el.html('<h2>' + polyglot.t("HomeDashboardHeader") + '<h2>' + '<p><a data-role="button" id="newPatient" class="btn btn-primary btn-lg">' + polyglot.t('newPatient') + '</a></p>');
  };

  ReportHeaderDashboardView.prototype.displayUserRegistrationForm = function() {
    return Coconut.trigger("displayUserRegistrationForm");
  };

  return ReportHeaderDashboardView;

})(Backbone.View);
