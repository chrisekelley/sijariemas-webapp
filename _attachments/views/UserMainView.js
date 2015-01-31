// Generated by CoffeeScript 1.6.3
var UserMainView;

UserMainView = Backbone.Marionette.ItemView.extend({
  template: JST["_attachments/templates/UserReportMenu.handlebars"],
  events: {
    "click #registrationLink": "submitRegistration",
    "click #newReportLink": "newReportLink"
  },
  initialize: function() {},
  submitRegistration: function() {
    console.log("submitRegistration");
    Coconut.trigger("userScan");
  },
  newReportLink: function() {
    console.log("newReportLink");
    Coconut.trigger("displayReportMenu");
  },
  ui: {
    checkboxes: "input[type=checkbox]"
  }
});