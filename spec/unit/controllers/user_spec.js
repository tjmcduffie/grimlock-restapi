var crud  = require('../../../app/lib/CRUDHelper');
var UserController = require('../../../app/controllers/User');
require('../../../app/models/Profile');
require('../../../app/models/User');


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
  var referenceDocuments = 'profile';

  beforeEach(function() {
    req = {
      body: fakeUser,
      params: {
        id: fakeUser.id
      }
    };
    res = jasmine.createSpyObj('res', ['json']);
    spyOn(crud, 'create');
    spyOn(crud, 'readOne');
    spyOn(crud, 'readMany');
    spyOn(crud, 'update');
    spyOn(crud, 'del');
  });

  describe('has a createUser method', function() {
    it('that calls through to CRUD.create', function() {
      UserController.createUser(req, res);
      expect(crud.create).toHaveBeenCalled();
    });
  });

  describe('has a readOneUser method', function() {
    it('that calls through to CRUD.readOne', function() {
      UserController.readOneUser(req, res);
      expect(crud.readOne).toHaveBeenCalled();
      expect(crud.readOne.mostRecentCall.args[3].populate).toBe(referenceDocuments);
    });
  });

  describe('has a readManyUsers method', function() {
    it('that calls through to CRUD.readMany', function() {
      UserController.readManyUsers(req, res);
      expect(crud.readMany).toHaveBeenCalled();
    });
    it('that doesn\'t populate reference documents by default', function() {
      UserController.readManyUsers(req, res);
      expect(crud.readMany.mostRecentCall.args[2].populate).toBe(undefined);
    });
    it('that populates reference documents when the detail param is set to full', function() {
      req.params.detail = 'full';
      UserController.readManyUsers(req, res);
      expect(crud.readMany.mostRecentCall.args[2].populate).toBe(referenceDocuments);
    });
    it('that requests the first page of results when no page number is provided', function() {
      UserController.readManyUsers(req, res);
      expect(crud.readMany.mostRecentCall.args[2].skip).toBe(0);
    });
    it('that requests the second page of results when page number 2 is provided', function() {
      req.params.page = 2;
      UserController.readManyUsers(req, res);
      expect(crud.readMany.mostRecentCall.args[2].skip).toBe((req.params.page - 1) *
          crud.readMany.mostRecentCall.args[2].limit);
    });
  });

  describe('has a updateUser method', function() {
    it('that calls through to CRUD.update', function() {
      UserController.updateUser(req, res);
      expect(crud.update).toHaveBeenCalled();
    });
  });

  describe('has a deleteUser method', function() {
    it('that calls through to CRUD.del', function() {
      UserController.deleteUser(req, res);
      expect(crud.del).toHaveBeenCalled();
    });
  });
});