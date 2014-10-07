var util = require('util');
var browser = require('request');
var env = process.env.NODE_ENV || 'dev';
var config = require('../../app/config/app')[env];

describe('The User API', function() {
  var userId = '5351822110435f6bf4a114e6';
  var url = 'http://localhost:' + config.ports.server + '/v1/user/';

  it('allows retrieval of a user based on ID', function(done){
    var response = browser.get(url + userId, function(error, response, body) {
      var json = JSON.parse(body);
      expect(error).toBe(null);
      expect(response).not.toBeUndefined();
      expect(response.statusCode).toEqual(200);
      expect(body).not.toBeUndefined();
      expect(json.status).toEqual('success');
      expect(util.isArray(json.data)).toEqual(true);
      expect(json.data.length).toEqual(1);
      expect(json.error).toEqual('');
      done();
    });
  });

  it('should send a 404 error when results are not found', function(done){
    var response = browser.get(url + '4321822110435f6bf4a114e6', function(error, response, body) {
      var json = JSON.parse(body);
      // console.log(response);
      expect(error).toBe(null);
      expect(response).not.toBeUndefined();
      expect(response.statusCode).toEqual(404);
      expect(body).not.toBeUndefined();
      expect(json.status).toEqual('fail');
      expect(util.isArray(json.data)).toEqual(true);
      expect(json.data.length).toEqual(0);
      expect(json.error).toEqual('');
      done();
    });
  });

  it('should send a 500 error when requests do not contain an id', function(done){
    var response = browser.get(url, function(error, response, body) {

      try {
        var json = JSON.parse(body);
      } catch (e) {
        console.log('error pasring JSON response');
        console.log(body);
        // throw new Error(e);
      }
      expect(error).not.toBe(null);
      expect(response).not.toBeUndefined();
      expect(response.status).toEqual(500);
      expect(body).not.toBeUndefined();
      expect(json.status).toEqual('fail');
      expect(util.isArray(json.data)).toEqual(true);
      expect(json.data.length).toEqual(1);
      expect(json.error).toEqual('');
      done();
    });
  });
});