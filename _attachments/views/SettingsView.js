// Generated by CoffeeScript 1.6.3
var SettingsView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SettingsView = (function(_super) {
  __extends(SettingsView, _super);

  function SettingsView() {
    this.viewReports = __bind(this.viewReports, this);
    this.changeLanguage = __bind(this.changeLanguage, this);
    this.sendReplicateLogs = __bind(this.sendReplicateLogs, this);
    this.updateForms = __bind(this.updateForms, this);
    this.refreshLog = __bind(this.refreshLog, this);
    this.replicate = __bind(this.replicate, this);
    this.render = __bind(this.render, this);
    _ref = SettingsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SettingsView.prototype.initialize = function() {
    var user;
    this.sync = new Sync();
    user = new User({
      _id: "user.admin"
    });
    return user.fetch({
      success: function() {
        var langChoice;
        langChoice = user.get('langChoice');
        this.langChoice = langChoice;
        return console.log("langChoice from doc: " + langChoice);
      }
    });
  };

  SettingsView.prototype.el = '#content';

  SettingsView.prototype.langChoice = '';

  SettingsView.prototype.events = {
    "click #replicate": "replicate",
    "click #refreshLog": "refreshLog",
    "click #updateForms": "updateForms",
    "click #sendReplicateLogs": "sendReplicateLogs",
    "click #viewReports": "viewReports",
    "change #langChoice": "changeLanguage"
  };

  SettingsView.prototype.render = function() {
    this.$el.html("        <h2>" + polyglot.t("server") + ("</h2>        <p><span class='sync-target'>" + (this.sync.target()) + "</span></p>        <p>" + (polyglot.t("version")) + ": " + Coconut.version_code + "</p>        <a data-role='button' class='btn btn-primary btn-lg' id='replicate'>") + polyglot.t("sendData") + "</a>        <a data-role='button' class='btn btn-primary btn-lg' id='updateForms'>" + polyglot.t("updateForms") + "</a>        <a data-role='button' class='btn btn-primary btn-lg' id='sendReplicateLogs'>" + polyglot.t("sendLogs") + "</a>        <span id='progress'></span>        <h2>" + polyglot.t("Reports") + "</h2>        <p>          <a data-role='button' class='btn btn-primary btn-lg' id='viewReports'>" + polyglot.t("viewReports") + "</a>        </p>        <h2>" + polyglot.t("SetLanguage") + "</h2>        <p>            " + polyglot.t("LangChoice") + "&nbsp;<span id='langCurrently'>" + langChoice + "</span><br/>" + "<select id='langChoice'>                <option value=''>--Select --</option>                <option value='en'>en</option>                <option value='pt'>pt</option>            </select>        </p>        <h2>" + polyglot.t("replicationLog") + "</h2>        <p>" + polyglot.t("replicationLogDescription") + "        <br/><br/><a data-role='button' class='btn btn-primary btn-lg' id='refreshLog'>" + polyglot.t("refreshLog") + "</a>        </p>        <div id=\"replicationLog\"></div>");
    return $("a").button();
  };

  SettingsView.prototype.replicate = function() {
    return Coconut.syncView.sync.replicateToServer({
      success: function() {
        $('#progress').append("<br/>Data sent to the server.<br/>");
        Coconut.syncView.refreshLog();
        return Coconut.syncView.sync.replicateFromServer({
          success: function() {
            $('#progress').append("Data received from the server.<br/>");
            return Coconut.syncView.refreshLog();
          },
          error: function(json, error) {
            $('#progress').append("Error receiving data to the server. Error: " + error + "<br/>");
            return Coconut.syncView.refreshLog();
          }
        });
      },
      error: function(json, error) {
        $('#progress').append("Error sending data to the server. Error: " + error + "<br/>");
        return Coconut.syncView.refreshLog();
      }
    });
  };

  SettingsView.prototype.refreshLog = function() {
    var now;
    now = moment(new Date()).format(Coconut.config.get("datetime_format")) + "<br/>";
    return $("#replicationLog").html(now + Coconut.replicationLog);
  };

  SettingsView.prototype.updateForms = function() {
    var opts;
    opts = {
      success: function() {
        var deferred, langId;
        $('#progress').append("<br/>Downloaded form definitions with the server.<br/>");
        langId = polyglot.t("id");
        $('#progress').append("Refreshing the current language: " + langId + "<br/>");
        deferred = CoconutUtils.fetchTranslation(langId);
        return deferred.done(function() {
          return console.log("Refreshed translation.");
        });
      },
      error: function() {
        return $('#progress').append("Error while trying to download form definitions with the server.<br/>");
      }
    };
    return this.sync.replicateForms(opts);
  };

  SettingsView.prototype.sendReplicateLogs = function() {
    var _this = this;
    return logger.getLogs(null, 100, function(log) {
      var completeLog, versionText;
      console.log("Generated logs");
      versionText = "Kiwi App version: " + Coconut.version_code + ".\n";
      completeLog = versionText.concat(log);
      CoconutUtils.saveLog(null, "Logcat log", completeLog);
      $('#progress').append("<br/>Logs saved. Data will now be replicated with the server.<br/>");
      return _this.replicate();
    });
  };

  SettingsView.prototype.changeLanguage = function() {
    var langChoice, user;
    langChoice = $('#langChoice').val();
    console.log("langChoice: " + langChoice);
    if (langChoice !== '') {
      user = new User({
        _id: "user.admin"
      });
      return user.fetch({
        success: function() {
          var docLangChoice;
          docLangChoice = user.get('langChoice');
          console.log("langChoice from doc: " + docLangChoice);
          user.set('langChoice', langChoice);
          return user.save(null, {
            success: function() {
              var deferred;
              console.log("langChoice saved: " + user.get('langChoice'));
              deferred = CoconutUtils.fetchTranslation(langChoice);
              return deferred.done(function() {
                console.log("Got translation for " + langChoice);
                Coconut.router.navigate("", false);
                return location.reload();
              });
            },
            error: function(json, msg) {
              return console.log("Error saving langChoice  " + msg);
            }
          });
        }
      });
    }
  };

  SettingsView.prototype.viewReports = function() {
    console.log("viewReports: ");
    return Coconut.trigger("displayAllRecords");
  };

  return SettingsView;

})(Backbone.View);
