/* global describe, it, expect, beforeEach*/
/** connect to mongo */
var mongoose = require('mongoose');
var ProjectModel = mongoose.model('Profile');


describe('Profile model', function() {
  var testProfile;
  var profileData = {
    user: '5351822110435f6bf4a114e6',
    title: 'foobar',
    interests: 'bar, baz',
    picture: 'http://www.foo.com/bar/baz.jpg'
  };

  it('should create a new Profile without throwing an error', function() {
    expect(function() {
      new ProjectModel(profileData);
    }).not.toThrow();
    console.log('1');
  });

  describe('required properties', function() {

    beforeEach(function() {
      testProfile = new ProjectModel(profileData);
    });

    it('includes a user reference', function(done) {
      testProfile.user = undefined;
      testProfile.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });
  });
});
