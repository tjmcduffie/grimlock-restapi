var crud  = require(process.cwd() + '/lib/CRUDHelper');
var ProfileModel = require(process.cwd() + '/models/Profile');
var UserModel = require(process.cwd() + '/models/User');
var UserController = require(process.cwd() + '/controllers/User');


describe('The User Controller', function() {
  var req, res;
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
  var next = function() {};

  beforeEach(function() {
    req = {
      body: fakeUser,
      params: {
        id: fakeUser.id
      }
    };
    res = { json: function() {} };
    spyOn(res, 'json');
    spyOn(crud, 'create');
    spyOn(crud, 'readOne');
    spyOn(crud, 'readMany');
    spyOn(crud, 'update');
    spyOn(crud, 'del');
  });

  describe('has a createUser method', function() {
    it('that calls through to CRUD.create', function() {
      UserController.createUser(req, res, next);
      expect(crud.create).toHaveBeenCalled();
    });
  });

  describe('has a readOneUser method', function() {
    it('that calls through to CRUD.readOne', function() {
      UserController.readOneUser(req, res, next);
      expect(crud.readOne).toHaveBeenCalled();
    });
  });

  describe('has a readManyUsers method', function() {
    it('that calls through to CRUD.readMany', function() {
      UserController.readManyUsers(req, res, next);
      expect(crud.readMany).toHaveBeenCalled();
    });
  });

  describe('has a updateUser method', function() {
    it('that calls through to CRUD.update', function() {
      UserController.updateUser(req, res, next);
      expect(crud.update).toHaveBeenCalled();
    });
  });

  describe('has a deleteUser method', function() {
    it('that calls through to CRUD.del', function() {
      UserController.deleteUser(req, res, next);
      expect(crud.del).toHaveBeenCalled();
    });
  });
});