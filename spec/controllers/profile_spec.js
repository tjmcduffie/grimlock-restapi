var crud  = require(process.cwd() + '/lib/CRUDHelper');
var ProfileModel = require(process.cwd() + '/models/Profile');
var ProfileController = require(process.cwd() + '/controllers/Profile');


describe('The Profile Controller', function() {
  var req, res;
  var fakeProfile = {
    'interests': 'stuff',
    'picture': 'https://pbs.twimg.com/profile_images/1268597598/sxsw-profile2.jpg',
    'title': 'Awesome overlord supreme',
    'user': '5377dacb984187ac6bdf3c4f',
    'contact': {
      'emails': [
        'timothy.mcduffie@gmail.com',
        'timmcduffie@icloud.com'
      ]
    }
  };
  var next = function() {};

  beforeEach(function() {
    req = {
      body: fakeProfile,
      params: {
        id: '5377dacb984187ac6bdf3c4f'
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

  describe('has a createProfile method', function() {
    it('that calls through to CRUD.create', function() {
      ProfileController.createProfile(req, res, next);
      expect(crud.create).toHaveBeenCalled();
    });
  });

  describe('has a readOneProfile method', function() {
    it('that calls through to CRUD.readOne', function() {
      ProfileController.readOneProfile(req, res, next);
      expect(crud.readOne).toHaveBeenCalled();
    });
  });

  describe('has a readManyProfiles method', function() {
    it('that calls through to CRUD.readMany', function() {
      ProfileController.readManyProfiles(req, res, next);
      expect(crud.readMany).toHaveBeenCalled();
    });
  });

  describe('has a updateProfile method', function() {
    it('that calls through to CRUD.update', function() {
      ProfileController.updateProfile(req, res, next);
      expect(crud.update).toHaveBeenCalled();
    });
  });

  describe('has a deleteProfile method', function() {
    it('that calls through to CRUD.del', function() {
      ProfileController.deleteProfile(req, res, next);
      expect(crud.del).toHaveBeenCalled();
    });
  });
});