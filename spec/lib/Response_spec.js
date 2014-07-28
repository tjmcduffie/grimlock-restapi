var Response = require('../../app/lib/Response');


describe('The Response normalizer', function() {
  var resWithoutErrorWithoutData, resWithErrorWithoutData, resWithErrorWithData, resWithoutErrorWithData,
      resWithErrorWithDataArray;
  var err = 'Test Error';
  var datum = {
    'foo': 'bar',
    'baz': 'bang'
  };
  var data = [datum, datum, datum];
  beforeEach(function() {
    resWithoutErrorWithoutData = new Response();
    resWithErrorWithoutData = new Response(err, undefined);
    resWithoutErrorWithData = new Response(undefined, datum);
    resWithErrorWithData = new Response(err, datum);
    resWithErrorWithDataArray = new Response(err, data);
  });

  // unit
  it('doesn\'t require any datum to generate a response', function() {
    expect(function() { new Response(undefined, undefined); }).not.toThrow();
  });

  it('should send a 500 status when created without errors or datum', function() {
    expect(resWithoutErrorWithoutData.getCode()).toEqual(500);
  });

  it('should accept an error message as the first param', function() {
    expect(function() { new Response(err, undefined); }).not.toThrow();
  });

  it('should accept a datum object as the second param', function() {
    expect(function() { new Response(undefined, datum); }).not.toThrow();
  });

  describe('handles errors', function() {
    it('stores error messages internally', function() {
      expect(resWithoutErrorWithoutData.err_).toEqual(undefined);
      expect(resWithErrorWithoutData.err_).toEqual(err);
      expect(resWithoutErrorWithData.err_).toEqual(undefined);
      expect(resWithErrorWithData.err_).toEqual(err);
    });
    it('supplies the error code as a number', function() {
      expect(typeof resWithoutErrorWithoutData.getCode()).toEqual('number');
      expect(typeof resWithErrorWithoutData.getCode()).toEqual('number');
      expect(typeof resWithoutErrorWithData.getCode()).toEqual('number');
      expect(typeof resWithErrorWithData.getCode()).toEqual('number');
    });
    it('determines the error code based on supplied errors', function() {
      expect(resWithoutErrorWithoutData.getCode()).toEqual(500);
      expect(resWithErrorWithoutData.getCode()).toEqual(404);
      expect(resWithoutErrorWithData.getCode()).toEqual(200);
      expect(resWithErrorWithData.getCode()).toEqual(500);
    });
  });

  describe('formats datum into JSON which ', function() {
    it('contains the status message', function() {
      expect(resWithoutErrorWithoutData.getData().status).toBeDefined();
      expect(resWithErrorWithoutData.getData().status).toBeDefined();
      expect(resWithoutErrorWithData.getData().status).toBeDefined();
      expect(resWithErrorWithData.getData().status).toBeDefined();
      expect(resWithErrorWithDataArray.getData().status).toBeDefined();
    });

    it('contains the response datum', function() {
      expect(resWithoutErrorWithoutData.getData().data).toBeDefined();
      expect(resWithErrorWithoutData.getData().data).toBeDefined();
      expect(resWithoutErrorWithData.getData().data).toBeDefined();
      expect(resWithErrorWithData.getData().data).toBeDefined();
      expect(resWithErrorWithDataArray.getData().data).toBeDefined();
    });

    it('contains any error messages', function() {
      expect(resWithoutErrorWithoutData.getData().error).toBeDefined();
      expect(resWithErrorWithoutData.getData().error).toBeDefined();
      expect(resWithoutErrorWithData.getData().error).toBeDefined();
      expect(resWithErrorWithData.getData().error).toBeDefined();
      expect(resWithErrorWithDataArray.getData().error).toBeDefined();
    });
  });
});