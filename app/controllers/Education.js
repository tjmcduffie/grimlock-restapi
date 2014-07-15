var util = require('util');
var mongoose = require('mongoose');

var Education = mongoose.model('Education');


var Response = function(err, data) {
  this.code = 200;
  this.data = util.isArray(data) ? data :
              (typeof data !== 'undefined' && data !== null) ? [data] :
              [];
  this.error = err || '';
  this.status = !(err) ? 'success' : 'fail';
};


module.exports = {
  createEducation: function(req, res, next) {
    var education = new Education(req.body);
    delete education.id;
    education.save(function(err, education) {
      res.json(new Response(err, education));
    });
    return next();
  },

  readOneEducation: function(req, res, next) {
    var slug = decodeURIComponent(req.params.slug);
    Education.findOneBySlug(slug)
      .exec(function(err, education) {
        res.json(new Response(err, education));
      });
    return next();
  },

  readManyEducations: function(req, res, next) {
    var page = decodeURIComponent(req.params.page);
    // var isFull = decodeURIComponent(req.params.type) === 'full';
    var limit = 20;
    var offset = (page - 1) * limit;
    var query = Education.find();

    // if (!isFull) {
    //   // nothing necessary with a small schema
    // }

    query.skip(offset)
      .limit(limit)
      .exec(function(err, educations) {
        res.json(new Response(err, educations));
      });
    return next();
  },

  updateEducation: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);

    var updates = {};
    updates.updatedOn = Date.now();
    for (var prop in req.params) {
      if (req.params.hasOwnProperty(prop)) {
        updates[prop] = req.params[prop];
      }
    }
    delete updates.id;

    Education.findByIdAndUpdate(id, updates, function(err, education) {
      res.json(new Response(err, education));
    });
    return next();

  },

  deleteEducation: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);
    Education.findOneAndRemove(id, function(err, education) {
      res.json(new Response(err, education));
    });
    return next();
  }
};
