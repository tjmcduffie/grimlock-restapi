require(process.cwd() + '/models/Profile');
var Profile = require('mongoose').model('Profile');
var crud = require(process.cwd() + '/lib/CRUDHelper');



module.exports = {
  createProfile: function(req, res) {
    req.body.user = req.body.user || req.userid;
    var profile = new Profile(req.body);
    crud.create(profile, res);
  },
  readOneProfile: function(req, res) {
    var id = decodeURIComponent(req.params.id);

    crud.readOne(Profile, res, id, {
      populate: (decodeURIComponent(req.params.detail) === 'full') ?
          'projects employments educations user' : undefined
    });
  },
  readManyProfiles: function(req, res) {
    var page = decodeURIComponent(req.params.page) || 1;
    var isFull = decodeURIComponent(req.params.detail) === 'full';
    var limit = 20;

    crud.readMany(Profile, res, {
      limit: limit,
      skip: (page - 1) * limit,
      populate: isFull ? 'projects employments educations user' : undefined,
      select: isFull ? {} : {
        title: 1,
        picture: 1,
        employments: 1,
        // employments: {
        //   title: 1,
        //   slug: 1,
        //   isCurrent: 1
        // },
        projects: 1
        // projects: {
        //   title: 1,
        //   slug: 1
        // }
      }
    });
  },
  updateProfile: function(req, res) {
    var id = decodeURIComponent(req.params.id);
    crud.update(Profile, res, id, {
      receivedData: req.body,
      $set: ['user', 'contact.emails', 'contact.website', 'contact.emails', 'contact.social',
          'title', 'interests', 'picture', 'skills',
          { key: 'updatedOn', value: req.body.updatedOn || Date.now()}
      ],
      $push: ['projects', 'employments', 'educations']
    });

  },
  deleteProfile: function(req, res) {
    var id = decodeURIComponent(req.params.id);
    crud.del(Profile, res, id);
  }
};
