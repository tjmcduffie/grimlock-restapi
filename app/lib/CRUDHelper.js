var Response = require('../lib/Response');

module.exports = {
  create: function(obj, res) {
    obj.save(function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  },

  readOne: function(obj, res, id, options) {
    if (typeof id === 'undefined') {
      throw new Error('The readOne operation requires an id as the third parameter');
    }

    var results = obj.findById(id);

    if (!!options && !!options.populate) {
      results.populate(options.populate);
    }

    results.exec(function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  },

  readMany: function(obj, res, options) {
    var results = obj.find();

    if (options) {
      if (options.skip) {
        results.skip(options.skip);
      }

      if (options.limit) {
        results.limit(options.limit);
      }

      if (options.select) {
        results.select(options.select);
      }

      if (options.populate) {
        results.populate(options.populate);
      }
    }

    results.exec(function(err, data) {
      if (!!err) {
        throw new Error(err.message);
      }
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  },

  update: function(obj, res, id, options) {
    var key = null;
    var updates = {
      $set: {},
      $push: {}
    };

    var updateIterator = function(element) {
      if (typeof element === 'string' && typeof options.receivedData[element] !== 'undefined') {
        updates[key][element] = options.receivedData[element];
      } else if (typeof element === 'object' && element.key && typeof element.value  !== 'undefined') {
        updates[key][element.key] = element.value;
      }
    };


    if (typeof obj === 'undefined') {
      throw new Error('The update operation requires a mongoose model as the first parameter');
    }

    if (typeof res === 'undefined') {
      throw new Error('The update operation requires a response object as the second parameter');
    }

    if (typeof id === 'undefined') {
      throw new Error('The update operation requires an id as the third parameter');
    }

    if (!options || !options.receivedData) {
      throw new Error('The update operation requires an options object with a populated receivedData prop');
    }

    for (var opt in options) {
      // console.log('checking for ' + opt);
      if (options.hasOwnProperty(opt) && updates.hasOwnProperty(opt)) {
        key = opt;
        options[opt].forEach(updateIterator);
      }
    }

    obj.findByIdAndUpdate(id, updates, function(err, data) {
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });

  },

  del: function(obj, res, id) {
    if (typeof id === 'undefined') {
      throw new Error('The delete operation requires an id as the third parameter');
    }
    obj.findOneAndRemove({_id: id}, function(err, data) {
      if (!!data && !!data.remove) {
        data.remove();
      }
      var response = new Response(err, data);
      res.json(response.getCode(), response.getData());
    });
  }
};