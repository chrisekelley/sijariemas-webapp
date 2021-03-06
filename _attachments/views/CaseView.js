var CaseView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CaseView = (function(_super) {
  __extends(CaseView, _super);

  function CaseView() {
    this.render = __bind(this.render, this);
    return CaseView.__super__.constructor.apply(this, arguments);
  }

  CaseView.prototype.el = '#content';

  CaseView.prototype.render = function() {
    return this.$el.html("<h1>" + (polyglot.t('Case ID')) + ": " + (this["case"].get("caseID")) + "</h1> <h3>" + (polyglot.t('LastModified')) + ": " + (this["case"].get("lastModifiedAt")) + "</h3> <table> <thead> <th>" + (polyglot.t('Property')) + "</th> <th>" + (polyglot.t('Value')) + "</th> </thead> <tbody> " + (_.map(this["case"].attributes, function(value, property) {
      return "<tr> <td> " + (polyglot.t(property)) + " </td> <td> " + (polyglot.t(value)) + " </td> </tr>";
    }).join("")) + " <tr> </tr> </tbody> </table>");
  };

  return CaseView;

})(Backbone.View);
