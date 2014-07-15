var util = require('util');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');


var Response = function(err, data) {
  this.code = 200;
  this.data = util.isArray(data) ? data :
              (typeof data !== 'undefined' && data !== null) ? [data] :
              [];
  this.error = err || '';
  this.status = !(err) ? 'success' : 'fail';
};


module.exports = {
  createProject: function(req, res, next) {
    var project = new Project(req.body);
    delete project.id;
    project.save(function(err, project) {
      res.json(new Response(err, project));
    });
    return next();
  },

  readOneProject: function(req, res, next) {
    var slug = decodeURIComponent(req.params.slug);
    var query = Project.findOneBySlug(slug);

    query.exec(function(err, project) {
        res.json(new Response(err, project));
      });
    return next();
  },

  readManyProjects: function(req, res, next) {
    var page = decodeURIComponent(req.params.page);
    var isFull = decodeURIComponent(req.params.type) === 'full';
    var limit = 20;
    var offset = (page - 1) * limit;
    var query = Project.find();

    if (!isFull) {
      query.select({
        title: 1,
        slug: 1
      });
    }

    query.skip(offset)
      .limit(limit)
      .exec(function(err, projects) {
        res.json(new Response(err, projects));
      });
    return next();
  },

  updateProject: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);

    var updates = {};
    updates.updatedOn = Date.now();
    for (var prop in req.params) {
      if (req.params.hasOwnProperty(prop)) {
        updates[prop] = req.params[prop];
      }
    }
    delete updates.id;

    Project.findByIdAndUpdate(id, updates, function(err, project) {
      res.json(new Response(err, project));
    });
    return next();

  },

  deleteProject: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);
    Project.findOneAndRemove(id, function(err, user) {
      res.json(new Response(err, user));
    });
    return next();
  }
};
