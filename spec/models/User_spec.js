/* global describe, it, expect, beforeEach*/
/** connect to mongo */
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

describe('User model', function() {
  var testUser;
  var userData = {
    lid: 'asdfasdf12341234',
    name: {
      first: 'foo',
      last: 'bar'
    },
    email: 'foo@bar.com',
    username: 'foobar1234'
  };

  it('should create a new User without throwing an error', function() {
    expect(function() {
      new UserModel(userData);
    }).not.toThrow();
  });

  describe('required properties', function() {

    beforeEach(function() {
      testUser = new UserModel(userData);
    });

    it('includes an lid', function(done) {
      testUser.lid = undefined;
      testUser.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

    it('includes a first name', function(done) {
      testUser.name.first = undefined;
      testUser.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

    it('includes a last name', function(done) {
      testUser.name.last = undefined;
      testUser.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

    it('includes an email', function(done) {
      testUser.email = undefined;
      testUser.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

    it('includes a username', function(done) {
      testUser.username = undefined;
      testUser.save(function(err) {
        expect(err).not.toBe(undefined);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });
  });

  describe('static methods', function() {
    it('should allow for lookup by slug', function() {
      expect(UserModel.findOneBySlug).toBeDefined();
    });

    it('should allow for lookup by id', function() {
      expect(UserModel.findOneById).toBeDefined();
    });
  });
});
