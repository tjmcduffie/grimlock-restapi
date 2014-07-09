require(process.cwd() + '/models/Profile');
require(process.cwd() + '/models/User');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crud  = require(process.cwd() + '/lib/CRUDHelper');


describe('The CRUDHelper', function() {
  var obj, res, mongoResult, UserModel, fakeId;
  var fakeUser = {
    'id': '5377dacb984187ac6bdf3c4f',
    'editDomain': 'test.timmcduffie.com',
    'slug': 'tester',
    'salt': '',
    'hashed_password': '',
    'username': 'tester',
    'email': 'tester@gmail.com',
    'name': {
      'first': 'tester',
      'last': 'mcdoofus',
      'formatted': 'tester mcdoofus'
    }
  };
  var isError = false;

  beforeEach(function() {
    obj = new User(fakeUser);
    UserModel = User;
    fakeId = 'fsz;gfzjkio24ewio';

    mongoResult = jasmine.createSpyObj('mongoResult', ['exec', 'limit', 'populate', 'select', 'skip']);
    res = jasmine.createSpyObj('res', ['json']);

    spyOn(obj, 'save').andCallFake(function(callback){
      var err = !isError ? {} : {err: true};
      var data = isError ? {} : {data: true};
      callback(err, data);
    });

    spyOn(UserModel, 'find').andReturn(mongoResult);
    spyOn(UserModel, 'findById').andReturn(mongoResult);
    spyOn(UserModel, 'findByIdAndUpdate').andReturn(mongoResult);
    spyOn(UserModel, 'findOneAndRemove').andReturn(mongoResult);
  });

  describe('has a create method', function() {
    it('requires a mongoose object as the first param', function() {
      expect(function() { crud.create(undefined, res); }).toThrow();
      expect(function() {
        crud.create(obj, res);
      }).not.toThrow();
    });
    it('requires an express response object as the second param', function() {
      expect(function() { crud.create(obj, undefined); }).toThrow();
      expect(function() {
        crud.create(obj, res);
      }).not.toThrow();
    });
    it('should call the save method on the model', function() {
      crud.create(obj, res);
      expect(obj.save).toHaveBeenCalled();
    });
  });

  describe('has a readOne method', function() {
    it('requires a mongoose object as the first param', function() {
      expect(function() { crud.readOne(undefined, res); }).toThrow();
      expect(function() {
        crud.readOne(UserModel, res, fakeId);
      }).not.toThrow();
    });
    it('requires an express response object as the second param', function() {
      expect(function() { crud.readOne(obj, undefined); }).toThrow();
      expect(function() {
        crud.readOne(UserModel, res, fakeId);
      }).not.toThrow();
    });
    it('requires a third param, id, that it passes to the ODM', function() {
      expect(function() {
        crud.readOne(UserModel, res, fakeId);
      }).not.toThrow();
      crud.readOne(UserModel, res, fakeId);
      expect(UserModel.findById.mostRecentCall.args[0]).toEqual(fakeId);
    });
    it('accepts a fourth optional param, options, that modifies the ODM query', function() {
      var options = {
        'populate': 'foo'
      };
      crud.readOne(UserModel, res, fakeId, options);
      expect(mongoResult.populate).toHaveBeenCalledWith(options.populate);
    });
    it('should call the exec method on the result', function() {
      crud.readOne(UserModel, res, fakeId);
      expect(mongoResult.exec).toHaveBeenCalled();
    });
  });

  describe('has a readMany method', function() {
    it('requires a mongoose object as the first param', function() {
      expect(function() { crud.readMany(undefined, res); }).toThrow();
      expect(function() {
        crud.readMany(UserModel, res);
      }).not.toThrow();
    });
    it('requires an express response object as the second param', function() {
      expect(function() { crud.readMany(obj, undefined); }).toThrow();
      expect(function() {
        crud.readMany(UserModel, res);
      }).not.toThrow();
    });

    describe('accepts a third optional param, options, that modifies the ODM query', function() {
      it ('that can populate other models', function() {
        var options = {
          populate: 'foo'
        };
        crud.readMany(UserModel, res, options);
        expect(mongoResult.populate).toHaveBeenCalledWith(options.populate);
      });
      it ('that can limit the number of returned results', function() {
        var options = {
          limit: 10
        };
        crud.readMany(UserModel, res, options);
        expect(mongoResult.limit).toHaveBeenCalledWith(options.limit);
      });
      it ('that can skip results', function() {
        var options = {
          skip: 10
        };
        crud.readMany(UserModel, res, options);
        expect(mongoResult.skip).toHaveBeenCalledWith(options.skip);
      });
      it ('that can select certain fields from results', function() {
        var options = {
          select: { foo: 1, bar: 0}
        };
        crud.readMany(UserModel, res, options);
        expect(mongoResult.select).toHaveBeenCalledWith(options.select);
      });
    });

    it('should call the exec method on the result', function() {
      crud.readMany(UserModel, res);
      expect(mongoResult.exec).toHaveBeenCalled();
    });
  });

  describe('has an update method', function() {
    var options = {
      receivedData: {},
      $set: [],
      $push: []
    };
    var optionsWithData = {
      receivedData: {'foo': 'bar', 'baz': 'bang', 'boom': ['blam', 'kapow']},
      $set: ['foo', 'bar', 'baz'],
      $push: ['boom']
    };
    var expectedData = {
      $set: {'foo': 'bar', 'baz': 'bang'},
      $push: {'boom': ['blam', 'kapow']}
    };
    it('requires a mongoose object as the first param', function() {
      expect(function() { crud.update(undefined, res, fakeId, options); }).toThrow();
      expect(function() {
        crud.update(UserModel, res, fakeId, options);
      }).not.toThrow();
    });
    it('requires an express response object as the second param', function() {
      expect(function() { crud.update(UserModel, undefined, fakeId, options); }).toThrow();
      expect(function() {
        crud.update(UserModel, res, fakeId, options);
      }).not.toThrow();
    });
    it('requires a third param, id, that it passes to the ODM', function() {
      expect(function() { crud.update(UserModel, res, undefined, options); }).toThrow();
      expect(function() {
        crud.update(UserModel, res, fakeId, options);
      }).not.toThrow();
      crud.update(UserModel, res, fakeId, options);
      expect(UserModel.findByIdAndUpdate.mostRecentCall.args[0]).toEqual(fakeId);
    });
    it('requires a fourth param, options, that it passes to the ODM', function() {
      expect(function() { crud.update(UserModel, res, fakeId, undefined); }).toThrow();
      expect(function() {
        crud.update(UserModel, res, fakeId, options);
      }).not.toThrow();
      crud.update(UserModel, res, fakeId, optionsWithData);
      expect(UserModel.findByIdAndUpdate.mostRecentCall.args[0]).toEqual(fakeId);
      expect(UserModel.findByIdAndUpdate.mostRecentCall.args[1]).toEqual(expectedData);
    });
  });

  describe('has a del method', function() {
    it('requires a mongoose object as the first param', function() {
      expect(function() { crud.del(undefined, res, fakeId); }).toThrow();
      expect(function() {
        crud.del(UserModel, res, fakeId);
      }).not.toThrow();
    });
    it('requires an express response object as the second param', function() {
      expect(function() { crud.del(obj, undefined, fakeId); }).toThrow();
      expect(function() {
        crud.del(UserModel, res, fakeId);
      }).not.toThrow();
    });
    it('requires a third param, id, that it passes to the ODM', function() {
      expect(function() { crud.del(obj, res, undefined); }).toThrow();
      expect(function() {
        crud.del(UserModel, res, fakeId);
      }).not.toThrow();
    });
    it('should call the findOneAndRemove method on the result', function() {
      crud.del(UserModel, res, fakeId);
      expect(UserModel.findOneAndRemove).toHaveBeenCalled();
    });
  });

});