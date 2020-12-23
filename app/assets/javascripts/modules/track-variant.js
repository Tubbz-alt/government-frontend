window.GOVUK.Modules = window.GOVUK.Modules || {};

(function(Modules) {
  "use strict";

  Modules.TrackVariant = function () {
    this.start = function (element) {
      if (window.GOVUK.cookie('cookies_preferences_set') !== 'true') {
        var variant = element.data('variant')

        if (variant === undefined) {
          return
        }

        var cookielessTracker = new GOVUK.Modules.CookielessTracker('UA-26179049-29', {
          name: 'CookielessTracker',
          storage: 'none',
          clientId: '0',
        });

        cookielessTracker.trackEvent('cookieless', 'hit', {
          trackerName: 'CookielessTracker',
          label: variant,
          javaEnabled: false,
          language: ''
        });
      }
    }
  }
})(window.GOVUK.Modules)
