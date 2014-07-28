var crud  = require('../../app/lib/CRUDHelper');
var ProfileController = require('../../app/controllers/Profile');
require('../../app/models/Profile');


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
  var referenceDocuments = 'projects employments educations user';

  beforeEach(function() {
    req = {
      body: fakeProfile,
      params: {
        id: '5377dacb984187ac6bdf3c4f'
      }
    };
    res = jasmine.createSpyObj('res', ['json']);
    spyOn(crud, 'create');
    spyOn(crud, 'readOne');
    spyOn(crud, 'readMany');
    spyOn(crud, 'update');
    spyOn(crud, 'del');
  });

  describe('has a createProfile method', function() {
    it('that calls through to CRUD.create', function() {
      ProfileController.createProfile(req, res);
      expect(crud.create).toHaveBeenCalled();
    });
  });

  describe('has a readOneProfile method', function() {
    it('that calls through to CRUD.readOne', function() {
      ProfileController.readOneProfile(req, res);
      expect(crud.readOne).toHaveBeenCalled();
    });
    it('that doesn\'t populate reference documents by default', function() {
      ProfileController.readOneProfile(req, res);
      expect(crud.readOne.mostRecentCall.args[3].populate).toBe(undefined);
    });
    it('that populates reference documents when the detail param is set to full', function() {
      req.params.detail = 'full';
      ProfileController.readOneProfile(req, res);
      expect(crud.readOne.mostRecentCall.args[3].populate).toBe(referenceDocuments);
    });
  });

  describe('has a readManyProfiles method', function() {
    it('that calls through to CRUD.readMany', function() {
      ProfileController.readManyProfiles(req, res);
      expect(crud.readMany).toHaveBeenCalled();
    });
    it('that doesn\'t populate reference documents by default', function() {
      ProfileController.readManyProfiles(req, res);
      expect(crud.readMany.mostRecentCall.args[2].populate).toBe(undefined);
    });
    it('that populates reference documents when the detail param is set to full', function() {
      req.params.detail = 'full';
      ProfileController.readManyProfiles(req, res);
      expect(crud.readMany.mostRecentCall.args[2].populate).toBe(referenceDocuments);
    });
    it('that requests the first page of results when no page number is provided', function() {
      ProfileController.readManyProfiles(req, res);
      expect(crud.readMany.mostRecentCall.args[2].skip).toBe(0);
    });
    it('that requests the second page of results when page number 2 is provided', function() {
      req.params.page = 2;
      ProfileController.readManyProfiles(req, res);
      expect(crud.readMany.mostRecentCall.args[2].skip).toBe((req.params.page - 1) *
          crud.readMany.mostRecentCall.args[2].limit);
    });
  });

  describe('has a updateProfile method', function() {
    it('that calls through to CRUD.update', function() {
      ProfileController.updateProfile(req, res);
      expect(crud.update).toHaveBeenCalled();
    });
  });

  describe('has a deleteProfile method', function() {
    it('that calls through to CRUD.del', function() {
      ProfileController.deleteProfile(req, res);
      expect(crud.del).toHaveBeenCalled();
    });
  });
});