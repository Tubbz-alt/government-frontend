describe('Test variant tracker', function() {
  "use strict";

  var tracker,
    element,
    FakeCookielessTracker,
    gaSpy;

  beforeEach(function() {
    gaSpy = jasmine.createSpyObj('initGa', ['send']);

    FakeCookielessTracker = function(trackingId, fieldsObject) {}
    FakeCookielessTracker.prototype.trackEvent = function(category, action, options) {
      gaSpy.send(category, action, options);
    }

    GOVUK.Modules.CookielessTracker = FakeCookielessTracker;

    tracker = new GOVUK.Modules.TrackVariant();
  });

  it('tracks A variant', function() {
    element = $('<meta data-variant="A" data-module="track-variant">');

    tracker.start(element);

    expect(gaSpy.send).toHaveBeenCalledWith('cookieless', 'hit', {
      trackerName: 'CookielessTracker',
      label: 'A',
      javaEnabled: false,
      language: ''
    });
  });

  it('tracks B variant', function() {
    element = $('<meta data-variant="B" data-module="track-variant">');

    tracker.start(element);

    expect(gaSpy.send).toHaveBeenCalledWith('cookieless', 'hit', {
      trackerName: 'CookielessTracker',
      label: 'B',
      javaEnabled: false,
      language: ''
    });
  });
});
