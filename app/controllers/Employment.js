var util = require('util');
var mongoose = require('mongoose');

var Employment = mongoose.model('Employment');


var Response = function(err, data) {
  this.code = 200;
  this.data = util.isArray(data) ? data :
              (typeof data !== 'undefined' && data !== null) ? [data] :
              [];
  this.error = err || '';
  this.status = !(err) ? 'success' : 'fail';
};


module.exports = {
  createEmployment: function(req, res, next) {
    var employment = new Employment(req.body);
    delete employment.id;
    employment.save(function(err, employment) {
      res.json(new Response(err, employment));
    });
    return next();
  },
  readOneEmployment: function(req, res, next) {
    var slug = decodeURIComponent(req.params.slug);
    var isFull = decodeURIComponent(req.params.type) === 'full';
    var query = Employment.findOneBySlug(slug);

    if (isFull) {
      query.select({
        title: 1,
        company: 1
      });
    }

    query.exec(function(err, employment) {
        res.json(new Response(err, employment));
      });
    return next();
  },
  readManyEmployments: function(req, res, next) {
    var page = decodeURIComponent(req.params.page);
    // var isFull = decodeURIComponent(req.params.type) === 'full';
    var limit = 20;
    var offset = (page - 1) * limit;
    var query = Employment.find();

    // if (!isFull) {
    //   // nothing necessary with a small schema
    // }

    query.skip(offset)
      .limit(limit)
      .exec(function(err, employments) {
        res.json(new Response(err, employments));
      });
    return next();
  },
  updateEmployment: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);

    var updates = {};
    updates.updatedOn = Date.now();
    for (var prop in req.params) {
      if (req.params.hasOwnProperty(prop)) {
        updates[prop] = req.params[prop];
      }
    }
    delete updates.id;

    Employment.findByIdAndUpdate(id, updates, function(err, employment) {
      res.json(new Response(err, employment));
    });
    return next();

  },
  deleteEmployment: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);
    Employment.findOneAndRemove(id, function(err, employment) {
      res.json(new Response(err, employment));
    });
    return next();
  }
};
