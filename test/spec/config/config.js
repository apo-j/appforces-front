'use strict';

describe('Configuration', function () {

  beforeEach(module('appForce'));

  it('.AppConfig should have content', function () {
    expect(Configuration.AppConfig).not.toBeNull();
  });
  
  it('.AppConfig.pages should have more than one page', function () {
    expect(Configuration.AppConfig.pages.length).toBeGreaterThan(0);
  });
});
